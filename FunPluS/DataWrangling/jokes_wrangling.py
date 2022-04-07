import pandas as pd
import re
import os

df = pd.read_csv('reddit-cleanjokes.csv')
# read in the cleanjokes dataset

df.columns = ['joke_id', 'joke_text']
# rename the columns based on the ERD requirements

# --------------Drop duplicated jokes-----------------------
df['joke_text_supp'] = df.joke_text.str.lower()\
.apply(lambda x: ' '.join(re.findall('[a-z ]+', x)))
# lower-case all the letters, remove all the non-alphabetical characters
# keep the original joke texts, create a new column joke_text_supp

df = df.drop_duplicates('joke_text_supp')
# drop duplicates based on joke_text_supp

# --------------Remove spam or non-joke texts-----------------------
df = df.drop(df.index[(df.joke_text_supp.str.contains('http|reddit'))|
                     (df.joke_text.str.contains('r/|u/'))])\
.reset_index(drop = True)
# remove the strings containing 'http', 'redit', 'r/ or u/'

# ------------Remove any jokes with inappropriate words-------------
bw = pd.read_csv('bad-words.csv')
# read in bad words dataframe
bwList = set(bw.jigaboo)
# create a set of bad words using bw dataframe

def detectBW(entry):
    '''
    Parameters
    ------------
    entry: individual joke from df.joke_text_supp

    Returns
    ------------
    an integer: number of bad words contained in the joke

    '''
    words = set(entry.split())
    # split the words using white space
    # create set to enable intersection function & remove repeated words
    if words.intersection(bw):
    # if any word is shared between bw and words
        return len(words.intersection(bw))
        # catch the common elements and return the length of it
    else:
        return 0
        # if no common words are found, return 0

df['bw_possible'] = df.joke_text_supp.apply(lambda x: detectBW(x))
# create 'bw_possible' column by applying detectBW to joke_text_supp
# bw_possible shows number of bad words within a joke
df.drop(df.index[df.bw_possible>0], inplace = True)
# if the joke contains bad words, drop the row

# ------------ Manually remove inappropriate/repetitive jokes -------------
# there might be jokes without bad words but inappropriate or insensitive
# these cannot neither get caught by a trained by ML model nor using
# any methods above. Therefore, each joke is read and censored manually
# This step is inevitable considering the target audience is children
# and teenagers.

inappropriate_id1 = [8, 10, 12, 16, 18, 24, 31, 34,
                     37, 38, 40, 43, 48, 50, 51, 54, 57,
                     61, 64, 68,74, 80, 85, 89, 95, 106,
                     110, 132, 133, 149, 152, 157, 159,
                     166, 189, 197, 205, 209, 214, 243,
                    257, 267, 273, 301, 309, 330, 334, 339,
                    341, 354, 360, 363, 376, 382, 388, 390,
                    394, 395, 397, 400, 405, 421, 427, 428,
                    432, 453, 457, 462, 466, 477, 478, 485,
                    494, 495, 497, 498, 499, 506, 508, 516,
                    519, 523, 529, 533, 540, 544, 546, 547,
                    560, 572, 576, 581, 582, 591, 593, 600,
                    605, 619, 741, 742, 748, 754, 755, 768,
                    770, 782, 783, 805, 810, 812, 849, 851,
                    854, 860, 865, 867, 868, 878, 879, 884,
                    892, 895, 897, 899, 901, 904, 906, 908,
                    913, 929, 931, 951, 964, 965, 987, 990,
                    1003, 1007, 1017, 1018, 1021, 1028, 1051,
                    1052, 1055, 1056, 1057, 1059, 1064, 1066,
                    1069, 1071, 1076, 1084, 1085, 1090, 1093,
                    1094, 1106, 1128, 1130, 1131, 1132, 1133,
                    1134, 1135, 1136, 1148, 1155, 1156, 1157,
                    1160, 1159, 1171, 1176, 1178, 1179, 1180,
                    1188, 1192, 1198, 1200, 1201, 1206, 1207,
                    1217, 1218, 1223, 1224, 1227, 1231, 1235,
                    1236, 1237, 1241, 1244, 1245, 1251, 1254,
                    1255, 1258, 1261, 1269, 1271, 1290, 1294,
                    1295, 1296, 1300, 1303, 1306, 1312, 1313,
                    1317, 1325, 1327, 1329, 1331, 1334, 1337,
                    1339, 1346, 1351, 1353, 1356, 1359, 1360,
                    1362, 1363, 1366, 1368, 1375, 1377, 1379,
                    1380, 1385, 1387, 1388, 1391, 1400, 1403,
                    1406, 1413, 1417, 1418, 1430, 1433, 1435,
                    1436, 1438, 1441, 1446, 1447, 1449, 1451,
                    1453, 1457, 1463, 1465, 1472, 1473, 1475,
                    1477, 1479, 1480, 1484, 1485, 1487, 1488,
                    1492, 1493, 1496, 1499, 1498, 1504, 1508,
                    1513, 1514, 1517, 1518, 1521, 1523, 1525,
                    1528, 1530, 1529, 1531, 1535, 1536, 1541,
                    1542, 1547, 1548, 1553, 1558, 1559, 1560,
                    1561, 1562, 1563, 1564, 1565, 1567, 1571,
                    1572, 1573, 1578, 1579, 1581, 1584, 1588,
                    1591, 1592, 1594, 1597, 1598, 1599, 1602,
                    1605, 1607, 1616, 1617, 1618]
# around 20% of the jokes are filtered out due to its contents or repetition

df = df.loc[~df.joke_id.isin(inappropriate_id1)].reset_index(drop = True)
# drop the jokes whose joke_id is in inappropriate_id1

# --------------------Format joke_text strings-----------------------

df['joke_id'] = df.index
# renew joke_id using the index of the dataframe
df['joke_text'] = df.joke_text.str.replace('"', "'").strip()
# replace '"' with "'" for clean text file
# this step must be taken in order to put all the data into the database

sentenceStops = '\. |\! |\? '
for i in sentenceStops.split('|'):
    df['joke_text'] = df.joke_text.str.replace(i, i.lstrip('\\')+'\n')
# create new lines based on punctuations when a joke has multiple sentences

# -------------------- Export dataframe -----------------------
df.loc[:, ['joke_id', 'joke_text']].to_csv('joke.csv', index = False)
# only keep the useful columns and remove the index column 
