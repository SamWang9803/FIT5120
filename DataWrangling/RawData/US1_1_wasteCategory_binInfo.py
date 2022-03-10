import pandas as pd
import os

df = pd.read_json('Melbourne_Garbage_collection_zones.geojson')

#--------------------------------------------------------------------------------
#                             Waste Type: Landfill
#--------------------------------------------------------------------------------

rub_ok = df['features'].apply(lambda x: x['properties']['rub_ok'].split(',')).explode()
# get the 'rub_ok' feature of each row
# split the strink chunk with item names using ','
# explode the list in each row in 'features'

rub_ok = rub_ok.drop_duplicates().apply(lambda x: x.split(';')).explode()
# drop all the duplicated items
# split the string further by ';' to retrieve individual items
# retrieve each element in the list by explode()

rubbishAcceptable = pd.DataFrame({'acceptable_items': rub_ok})\
.reset_index(drop = True)

rubbishAcceptable['bin_type'] = 'landfill'

rub_notok = df['features'].apply(lambda x: x['properties']['rub_notok'].split(',')).explode()
# get the 'rub_notok' feature of each row
# split the strink chunk with item names using ','
# explode the list in each row in 'features'

rub_notok = rub_notok.drop_duplicates().apply(lambda x: x.split(';')).explode()
# drop all the duplicated items
# split the string further by ';' to retrieve individual items
# retrieve each element in the list by explode()

rubbishUnacceptable = pd.DataFrame({'unacceptable_items': rub_notok})\
.reset_index(drop = True)

rubbishUnacceptable['bin_type'] = 'landfill'

#--------------------------------------------------------------------------------
#                             Waste Type: Recyclable
#--------------------------------------------------------------------------------

rec_ok = df['features'].apply(lambda x: x['properties']['rec_ok'].split(',')).explode()
# get the 'rec_ok' feature of each row
# split the strink chunk with item names using ','
# explode the list in each row in 'features'

rec_ok = rec_ok.drop_duplicates().apply(lambda x: x.split(';')).explode()
# drop all the duplicated items
# split the string further by ';' to retrieve individual items
# retrieve each element in the list by explode()

recyclableAcceptable = pd.DataFrame({'acceptable_items': rec_ok})\
.reset_index(drop = True)

recyclableAcceptable['bin_type'] = 'recyclable'

rec_notok = df['features'].apply(lambda x: x['properties']['rec_notok'].split(',')).explode()
# get the 'rec_notok' feature of each row
# split the strink chunk with item names using ','
# explode the list in each row in 'features'

rec_notok = rec_notok.drop_duplicates().apply(lambda x: x.split(';')).explode()
# drop all the duplicated items
# split the string further by ';' to retrieve individual items
# retrieve each element in the list by explode()

recyclableUnacceptable = pd.DataFrame({'unacceptable_items': rec_notok})\
.reset_index(drop = True)

recyclableUnacceptable['bin_type'] = 'recyclable'

acceptables = pd.concat([recyclableAcceptable, rubbishAcceptable])\
.sort_values(['bin_type', 'acceptable_items']).reset_index(drop = True)
# append all the dataframes with acceptable items, sort values based on bin_type and acceptable_items

unacceptables = pd.concat([recyclableUnacceptable, rubbishUnacceptable])\
.sort_values(['bin_type', 'unacceptable_items']).reset_index(drop = True)
# append all the dataframes with unacceptable items, sort values based on bin_type and acceptable_items

exportFolder = '../wrangledData/'

acceptables.to_csv(exportFolder + 'us1_1_acceptables.csv', index = False)

unacceptables[['bin_type', 'unacceptable_items']].to_csv(exportFolder + 'us1_1_unacceptables.csv', index = False)
