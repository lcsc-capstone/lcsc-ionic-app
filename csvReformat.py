import csv
class Tutor:
	def __init__(self,name):
		self.name=name
		self.classes=[]
	def classString(self,string):
		subject=string.split(" ")[0]
		string=string[string.find(" "):]
		numbers=string.split(",")
		for num in numbers:
			self.classes.append(subject+""+num)
	def __str__(self):
		classString=""
		for c in self.classes:
			classString+=c+", "
		return "{\"name\":\""+self.name+"\""+", \"classes\":\""+classString[0:-2]+"\"}"
data=raw_input("File path: ")
data=open(data)
data=csv.reader(data,delimiter=',', quotechar='"')
tutors=[]
temp=Tutor("")
for row in data :
	if row[1]!='':
		tutors.append(temp)
		temp=Tutor(row[1])
	temp.classString(row[-1])

out=open("tutors.json",'w')

assemble="{\"items\":["
for tutor in tutors[2:]:
	assemble+=(str(tutor)+"\n,")
assemble=assemble[:-1]
assemble+="]}"
out.write(assemble)
out.close()
out=open("classes.json","w")
assemble="{\"items\":["
classes={}
for tutor in tutors[2:]:
	for c in tutor.classes:
		classes[c]=c
classesList=[]
for c in classes:
	classesList.append(c)
classesList.sort()
for c in classesList:
	assemble+="{\"name\":\""+c+"\"},"
assemble=assemble[:-1]
assemble+="]}"
out.write(assemble)

