import csv
class classData:
	def __init__(self,name):
		self.name=name
		self.tutors=[]
		self.times=[]
	def getTimes(self):
		ret="\""+str(self.name)+"\":["
		for time in self.times:
			ret+="\""+str(time)+"\","
		if not ret[-1]=="[":		
			ret=ret[:-1]

		ret+="]"
		return ret 

		 
	def __str__(self):
		tutorString=""
		for tutor in self.tutors:
			tutorString+=tutor+", "
		return "{\"name\":\""+self.name+"\""+", \"tutors\":\""+tutorString[0:-2]+"\"}"

class Tutor:
	def __init__(self,name):
		self.name=name
		self.classes=[]
		self.times=[]
	def classString(self,string):
		subject=string.split(" ")[0]
		string=string[string.find(" "):]
		numbers=string.split(",")
		for num in numbers:
			self.classes.append(subject+""+num)
	def getTimes(self):
		ret="\""+str(self.name)+"\":["
		for time in self.times:
			ret+="\""+str(time)+"\","
		if not ret[-1]=="[":		
			ret=ret[:-1]
		
		ret+="]"
		return ret 

		 
	def __str__(self):
		classString=""
		for c in self.classes:
			classString+=c+", "
		return "{\"name\":\""+self.name+"\""+", \"classes\":\""+classString[0:-2]+"\"}"


#data=raw_input("File path: ")
data="SP18 Tentative Schedule 2.csv"
data=open(data)
data=csv.reader(data,delimiter=',', quotechar='"')
timesFile="SP18 Tentative Schedule.csv"
timesFile=open(timesFile)
timesFile=csv.reader(timesFile,delimiter=',', quotechar='"')
tempList=[]
for row in timesFile:
	if row[1]=='http://www.lcsc.edu/math-and-science-tutoring-center':
		break
	tempList.append(row)
week=[]

for i in range(2,8):
	day=[]
	build=[]
	build.append(tempList[8][i])
	people=[]
	for row in tempList[9:]:	
		if row[1]!="":
			build.append(people)
			day.append(build)			
			build=[]
			people=[]
			build.append(row[1])			
		people.append(row[i])	
	week.append(day)
	day=[]

#for d in week[1:2]:
#	for time in d:
#		print time		
people={}
for day in week:
	wDay=day[0][0]
	for time in day:
		for tutor in time[1]:
			if not tutor in people:
				people[tutor]=[]
			
			people[tutor].append((wDay,time[0])) 	


tutors=[]
temp=Tutor("")
for row in data :
	if row[1]!='':
		tutors.append(temp)
		temp=Tutor(row[1])
	temp.classString(row[-1])

for tutor in tutors:
	if tutor.name in people:
		tutor.times=people[tutor.name]
	if len(tutor.name)>1 and tutor.name[-1]=="*" and tutor.name[:-1] in people:
		tutor.times=people[tutor.name[:-1]]
	
out=open("combined.json",'w')

assemble="{\"tutors\":["
for tutor in tutors[2:]:
	assemble+=(str(tutor)+"\n,")
assemble=assemble[:-1]
assemble+="],"
assemble+="\"classes\":["
classes={}

for tutor in tutors[2:]:
	for c in tutor.classes:
		if not c in classes:
			classes[c]=classData(c);
		classes[c].tutors.append(tutor.name)
		for time in tutor.times:		
			classes[c].times.append(time)
	
classesList=[]
for c in classes:

	classesList.append(classes[c])
classesList.sort(key=lambda classData: classData.name)
for c in classesList:

	assemble+=str(c)+",\n"
assemble=assemble[:-2]
assemble+="],\"times\":{"
for tutor in tutors:
	
	build=[]
	endChain=True
	startTime=""
	endTime=""	
	#timeStretch
	day=""
	assemble+="\""+tutor.name+"\":["
	for i in range(0,len(tutor.times)-1):
		prepTime=tutor.times[i][1].split('-')
		
		if endChain:
			
			endTime=""
			startTime=prepTime[0]
			prepTime[1]=prepTime[1].strip()
			endChain=False
		#print people[person][i][0],people[person][i+1][0],people[person][i][0]==people[person][i+1][0]
		#print prepTime[1] , people[person][i+1][1],prepTime[1] in people[person][i+1][1]
		if tutor.times[i][0]==tutor.times[i+1][0] and prepTime[1] in tutor.times[i+1][1]:
			#print "merging time "+str(people[person][i])+" with "+str(people[person][i+1])
			#print startTime+"-"+ people[person][i+1][1].split("-")[1]
			endTime=tutor.times[i+1][1].split("-")[1]
				
			pass
		else:
			
			endChain=True
			if not endTime in tutor.times[i][1]:
				
				print tutor.times[i]
		day=tutor.times[i][0]
		if endChain:
			temp=  "\""+day+" "+startTime.strip()+" - "+ endTime.strip()+"\","
			if len(temp)>10:
				assemble+=(temp)
	temp=  "\""+day+" "+startTime.strip()+" - "+ endTime.strip()+"\","	
	if len(temp)>10:
		assemble+=(temp)	
  	
	
	#print person
	#print people[person] 
	if assemble[-1]=="[":
		assemble+="\"No Times Found\","
	assemble=assemble[:-1]	
	
	assemble+=("],\n");

	

for tutor in classesList:
	
	build=[]
	endChain=True
	startTime=""
	endTime=""	
	#timeStretch
	day=""
	assemble+="\""+tutor.name+"\":["
	for i in range(0,len(tutor.times)-1):
		prepTime=tutor.times[i][1].split('-')
		
		if endChain:
			
			endTime=""
			startTime=prepTime[0]
			prepTime[1]=prepTime[1].strip()
			endChain=False
		#print people[person][i][0],people[person][i+1][0],people[person][i][0]==people[person][i+1][0]
		#print prepTime[1] , people[person][i+1][1],prepTime[1] in people[person][i+1][1]
		if tutor.times[i][0]==tutor.times[i+1][0] and prepTime[1] in tutor.times[i+1][1]:
			#print "merging time "+str(people[person][i])+" with "+str(people[person][i+1])
			#print startTime+"-"+ people[person][i+1][1].split("-")[1]
			endTime=tutor.times[i+1][1].split("-")[1]
				
			pass
		else:
			
			endChain=True
			if not endTime in tutor.times[i][1]:
				
				print tutor.times[i]
		day=tutor.times[i][0]
		if endChain:
			temp=  "\""+day+" "+startTime.strip()+" - "+ endTime.strip()+"\","
			if len(temp)>10:
				assemble+=(temp)
	temp=  "\""+day+" "+startTime.strip()+" - "+ endTime.strip()+"\","	
	if len(temp)>10:
		assemble+=(temp)	
  	
	
	#print person
	#print people[person] 
	if assemble[-1]=="[":
		assemble+="\"No Times Found\","
	assemble=assemble[:-1]	
	
	assemble+=("],\n");
assemble=assemble[:-2]
assemble+="}}";
out.write(assemble)

