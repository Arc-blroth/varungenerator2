import time
import json
from nltk.corpus import wordnet as wn

startTime = int(time.time())
adjCounter = 0
allTheAdjectives = {}

# categorize adjectives by letter
for letter in "abcdefghijklmnopqrstuvwxyz.-1234567890":
	allTheAdjectives[letter] = []

for synset in wn.all_synsets(wn.ADJ):
    for lemma in synset.lemmas():
	    key = lemma.name().lower()[0]
	    if key in allTheAdjectives:
		    allTheAdjectives[key].append(lemma.name())
		    adjCounter += 1

# wellness is technically a noun
allTheAdjectives["w"].append("wellness")

# dump to json file
with open('adjectives.json', 'w') as outfile:
    json.dump(allTheAdjectives, outfile)

print("Dumped " + str(adjCounter) + " adjectives in " + str(int(time.time()) - startTime) + " seconds!")