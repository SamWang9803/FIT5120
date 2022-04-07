censoredJokes = pd.read_csv('joke.csv')
# read in the dataframe

firstLine = 'INSERT INTO joke(joke_id, joke_text) VALUES \n'
# first line of the dataframe based on ERD

for i in censoredJokes.index:
    firstLine = firstLine + (f'({censoredJokes.joke_id[i]},"{censoredJokes.joke_text[i]}"),\n')
    # format the joke_text and joke_id into an SQL script

with open('cleanJokeSQL.sql', 'w+') as output:
    output.write(firstLine)
    # write the created SQL script into an SQL file 
