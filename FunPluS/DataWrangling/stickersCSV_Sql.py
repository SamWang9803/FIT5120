import os
import re
import pandas as pd

iconCategory = [i for i in os.listdir('icons') if '.' not in i]
# get all the directories within 'icons' folder

imagePath = []
imagePrice = []
imageCategory = []
# create arrays to respective columns

for i in iconCategory:
    for icon in os.listdir('icons/'+i):
        if icon != '.DS_Store':
            imagePath.append(f"{'~/icons/'+i+'/'+icon}")
            imagePrice.append(1)
            imageCategory.append(i)
            # append respective values to each column

iconsCSV = pd.DataFrame({'image_path':imagePath,
                              'image_price':imagePrice,
                              'image_category':imageCategory})
# create a pandas dataframe with the filled arrays

iconsCSV.to_csv('icons.csv', index = False)
# export to CSV file

iconsCSV = pd.read_csv('icons.csv')
# read in the CSV file

startingString = 'INSERT INTO stickers(image_path, image_price, image_category) VALUES \n'
# starting line of the SQL query

for i in range(iconsCSV.shape[0]):
    entry = iconsCSV.iloc[i, :]
    startingString += f"('{entry[0]}', {entry[1]}, '{entry[2]}'),\n"
            # format the string to SQL format to save the path as string object

with open('stickersInsert.sql', 'w') as f:
    f.write(startingString[:-2])
# write the created SQL string object into an SQL file
# remove the last comma generated from the for-loop
