import pandas as pd
pd.options.mode.chained_assignment = None  # default='warn'

df = pd.read_csv('Waste_collected_per_month.csv')

binColours = pd.DataFrame({'bin_type':['recyclable', 'landfill', 'organics'],
                          'bin_colour':['yellow', 'red', 'brown']})
# create dataframe with bin colours based on bin type

categoryStats = df[['date', 'dumped_rubbish',
                    'commingled_recycling', 'green_waste']]
# retrieve only the useful columns from the original dataframe

categoryStats = df.loc[df.date.str.endswith('9'), ['date', 'dumped_rubbish',
                    'commingled_recycling', 'green_waste']]
# filter the dataframe and only retrieve the records from 2019
# the latest year with the most complete data is the year of 2019

categoryStats['date'] = pd.to_datetime(categoryStats['date'], format = '%B %Y')
# change the data type of date to datetime

melbResidents= 178994
# number of residents in Melbourne at the year of 2019

for eachWaste in ['dumped_rubbish', 'commingled_recycling', 'green_waste']:
# for each type of waste

    categoryStats[f'{eachWaste}_kg'] = categoryStats[eachWaste]*1000
    # create a new column which shows weight of wastes in KG
    categoryStats[f'{eachWaste}_pp_kg'] = categoryStats[f'{eachWaste}_kg']/melbResidents
    # create a new column which shows weight of wastes disposed per person

    categoryStats.drop(eachWaste, axis = 1, inplace = True)
    # drop all the original columns

pp_kg = [f'{eachWaste}_pp_kg' for eachWaste in ['dumped_rubbish', 'commingled_recycling', 'green_waste']]

avgWasteDisposal = pd.DataFrame(categoryStats[pp_kg].median()).reset_index()
# keep only the columns indicating wastes disposed per person
# calculate the median of the wastes disposed per person

avgWasteDisposal.columns = ['bin_type', 'avg_monthly_collected']
avgWasteDisposal.loc[avgWasteDisposal.bin_type == 'dumped_rubbish_pp_kg', 'bin_type'] = 'landfill'
avgWasteDisposal.loc[avgWasteDisposal.bin_type == 'commingled_recycling_pp_kg', 'bin_type'] = 'recyclable'
avgWasteDisposal.loc[avgWasteDisposal.bin_type == 'green_waste_pp_kg', 'bin_type'] = 'organics'
# rename the bin type

binInfo = avgWasteDisposal.merge(binColours)
# join the dataframe from binColours to complete the dataframe

exportFolder = '../wrangledData/'
binInfo.to_csv(exportFolder +'us1_1_2_binInfo.csv', index = False)
