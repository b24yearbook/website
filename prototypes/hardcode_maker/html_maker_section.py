# Use Camel Case since the rest of the project is in camel case - even if it hurts

import json

specialCase1 = {"A Santos":"A. Santos", "G Velasquez":"G. Velasquez"}
specialCase2 = {"Ilang Ilang":"Ilang-Ilang"}

grouping = open("groupings.json", "r")
groups = json.loads(grouping.read())
grouping.close()

htmlFile = open("html_file.html", "w")

def lowerConnect(s, lower=True):
    return "".join( (s.lower() if lower else s).split())

def makeSecElem(grade, section):
    #<div id="grade7Diamond" class="grade7Section sectionCont">
    #   <img src="grade7Diamond.png">
    #   <p class="sectionName" style="special_style">Diamond</p>
    #</div>
    sectionShow = specialCase1[section] if section in specialCase1 else\
                  specialCase2[section] if section in specialCase2 else\
                  section
    
    htmlFile.write(f'            <div id="{grade}{lowerConnect(section, False)}" class="{grade}Section sectionCont">\n')
    htmlFile.write(f'                <img src="{grade}{lowerConnect(section, False)}.png">\n')
    htmlFile.write(f'                <p class="sectionName" style="special_style">{sectionShow}</p>\n')
    htmlFile.write( '            </div>\n')
    #"".join( grade.lower().split() ) + se
def makeGradeElem(gradeLevel):
    #<div id="grade7" class="gradeLevel">
    #   <div class="gradeLevelCont"><h2 class="gradeText">Grade 7</h2></div>
    #   <div class="sectionsCont"> multiple section elements </div>
    #</div>
    
    
    grade, sections = gradeLevel
    gradeText=grade
    grade = grade if grade != "SYP Silids" else "SYP"
    
    htmlFile.write(f'    <div id="{lowerConnect(grade)}" class="gradeLevel">\n')
    htmlFile.write(f'        <div class="gradeLevelCont"><h2 class="gradeText">{gradeText}</h2></div>\n')
    htmlFile.write( '        <div class="sectionsCont">\n')
    for s in sections:
        makeSecElem(lowerConnect(grade), s)
    htmlFile.write( '        </div>\n')
    htmlFile.write( '    </div>\n')

gradeLevels = groups["Grade Levels"]

htmlFile.write("<div>\n")
for g in gradeLevels:
    makeGradeElem(list(g.items())[0])
htmlFile.write("</div>\n")

htmlFile.close()
