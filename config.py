from os import system, name

#Replace constans in each html file
def replace_data (constant, content):
	#Files where data will be replaced
	files = ['index.html', 'article.html', './write/index.html']
	#Goes through the array
	for file_name in files:
		with open (file_name) as f:
			newText = f.read().replace (constant, content)
		with open (file_name, "w") as f:
			f.write (newText)
#End of replace_data

#Verify if all user inputs are valid
def verify_inputs (name, bio, github, linkedin, email):
	#Still have to implement
	return True
#End of verify_inputs

#To clear the screen
def cls (): 
	# for windows 
	if name == 'nt': 
		_ = system('cls') 
	# for mac and linux (here, os.name is 'posix') 
	else: 
		_ = system('clear')
#End of cls


#The entrypoint of the script
def main ():
	correct = 'n'
	while (correct.lower()[0] not in ['y', 'Y']):
		cls ()
		print ('Hi, i\'m going to help you configure your mBlog!\nI have a few questions for you. Let\'s start!');
		name = input ('\nWhat\'s the author\'s name for the blog? ')
		bio = input ('Tell me a simple bio of the author (this is going to be visible in the home page, be concise): ')
		github = input ('Now give the link to your Github (You can leave it blank if you want): ')
		linkedin = input ('Now the link to your LinkedIn (You can also leave blank): ')
		email = input ('We\'re almost there, now I need an email for people to contact you! (You can also leave blank): ')
		
		#Verify inputs and get confirmation from user
		if (verify_inputs (name, bio, github, linkedin, email) == False):
			_ = input ('\nOps, something is wrong.\nPlease verify your inputs and try again! (Type ENTER to continue) ')
		else:
			print ('\nI\'m done with questions, please check all the information below:\n')
			print ('Name:', name)
			print ('Bio:', bio)
			print ('Github:', github)
			print ('LinkedIn:', linkedin)
			print ('Email:', email)
			correct = input ('\nIs this correct? (Y/N): ')
		#End of if/else
	#End of while
	
	constants = {
		'{AUTHOR_NAME}': name, 
		'{AUTHOR_BIO}': bio, 
		'{AUTHOR_GITHUB}': github, 
		'{AUTHOR_LINKEDIN}': linkedin, 
		'{AUTHOR_EMAIL}': email
	}

	#Iterate replacing data on mBlog files
	for key, value in constants.items ():
		replace_data (key, value)
	#End of for
	
	#End of setup
	print ('\nAwesome! We\'ve finished the configuration of your blog ;)\nNow you can delete me, upload all other files to a server and start writing!')
#End of main




#Start everything
main ()