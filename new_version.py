#!/usr/bin/python3

import sys, getopt

#Replace version number in html files
def replace_version (current_version, new_version):
	#Files where version number will be replaced
	files = ['index.html', 'article.html', './write/index.html']
	#Goes through the array replacing the version in each file
	for file_name in files:
		with open (file_name) as f:
			newFileContent = f.read ().replace (current_version, new_version)
		with open (file_name, 'w') as f:
			f.write (newFileContent)


#Parses and validates command line arguments
def parse_arguments (argv):
	from_version = ''
	to_version = ''
	try:
		opts, args = getopt.getopt (sys.argv[1:], '',['from=','to='])
	except getopt.GetoptError:
		print ('Usage: new_version.py --from <current_version> --to <new_version>')
		sys.exit ()
	for opt, arg in opts:
		if opt == '--help':
			print ('Usage: new_version.py --from <current_version> --to <new_version>')
			sys.exit ()
		elif opt in ('--from'):
			from_version = arg
		elif opt in ('--to'):
			to_version = arg
		else:
			print ('Usage: new_version.py --from <current_version> --to <new_version>')
			sys.exit ()
	if (from_version == '' or to_version == ''):
		print ('Usage: new_version.py --from <current_version> --to <new_version>')
		sys.exit ()
	else:
		#Returns parsed arguments
		return (from_version, to_version)


# Parses command line arguments --from and --to so executes the 
if __name__ == '__main__':
	from_version, to_version = parse_arguments (sys.argv)
	replace_version (from_version, to_version);