#################################################
# Name: Eline Rietdijk
# Studentnumber: 10811834
# Project: D3 Barchart

# 'convertCSV2JSON.py'
# This file converts CSV file to JSON object
#################################################

import csv
import json

# open csvfile to read and jsonfile to write
csvfile1 = open('totalDeaths.csv', 'r')
csvfile2 = open('totalPopulation.csv', 'r')
jsonfile = open('rawData.json', 'w')

# count rows in csvfile
reader1 = csv.DictReader(csvfile1)
reader2 = csv.DictReader(csvfile2)
rowCount1 = sum(1 for row in reader1)
rowCount2 = sum(1 for row in reader2)

if rowCount2 != rowCount1:
	print("*****Ongelijk aantal rijen.********")

# open file again to read file again
csvfile1 = open('totalDeaths.csv', 'r')
csvfile2 = open('totalPopulation.csv', 'r')
reader1 = csv.DictReader(csvfile1)
reader2 = csv.DictReader(csvfile2)

counter = 0

# iterate over rows in csvfile
for row in reader1:
	# use counter to keep track of number of row 
	counter += 1

	print("BEGIN VAN EEN RIJ")
	print(row[2015])
	# at the first row, first print [
	if counter == 1:
		jsonfile.write('[')

	# write each row as jason object on a new line
	json.dump(row, jsonfile)

	# print ',' at the end of each line except for last one
	if not counter == rowCount1:
		jsonfile.write(',')

	# print ] at the end of the last line
	else: 
		jsonfile.write(']')

	# start new line at the end of each line
	jsonfile.write('\n')


    


