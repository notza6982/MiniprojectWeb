from flask import Flask,render_template, request
from werkzeug.utils import secure_filename
import AI.faceshape
import mysql.connector
import json

face_shapes = ['squared shape.','round shape.','triangle shape.','diamond shape.','rectangular.','oval.']
glasses_recomments = ["Oval, Round and Large","Rectangle, Square and Oval","Rectangle, Oval and Horn","Rectangle, Oval and Horn","Rectangle, Square and Oval","Rectangle, Oval, Square, Round, Large and Horn"]
con = mysql.connector.connect(user='root', password='',host='127.0.0.1',database='glasses_shop')
cursor = con.cursor()

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("add.html") 

@app.route('/upload')
def upload():
   return render_template('upload.html')
	
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      f.save(secure_filename("img.png"))
      fs = AI.faceshape.process()
      for i,face_shape in enumerate(face_shapes):
         if fs==face_shape:
            return "<h1> Your face shape is "+face_shape+"</h1></br><h3> Glasses recommended for you is  "+glasses_recomments[i]+"</h3>"

@app.route('/getinfo/<table>')
def getinfo(table):
   sql = ("select * from " + str(table))
   cursor.execute(sql)
   data = cursor.fetchall() 
   return str(data)

@app.route('/insert_userinfo/', methods=['GET', 'POST'])
def insert_userinfo():
   if request.method == "POST":
      details = request.form
      cursor.execute("""SELECT COUNT(id) FROM userinfo""")
      maxid = cursor.fetchone() 
      sql = "INSERT INTO userinfo (id, username, pwd, firstname, lastname, email, phone, address) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
      val = (maxid[0], details['username'], details['pwd'], details['firstname'], details['lastname'], details['email'], details['phone'], details['address'])
      cursor.execute(sql, val)
      con.commit()
      return "Success"
   else:
      return "Unsuccess"
      

@app.route('/insert_userinfo/', methods=['GET', 'POST'])
def insert_userinfo():
   if request.method == "POST":
      details = request.form
      cursor.execute("""SELECT COUNT(id) FROM userinfo""")
      maxid = cursor.fetchone() 
      sql = "INSERT INTO userinfo (id, username, pwd, firstname, lastname, email, phone, address) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
      val = (maxid[0], details['username'], details['pwd'], details['firstname'], details['lastname'], details['email'], details['phone'], details['address'])
      cursor.execute(sql, val)
      con.commit()
      return "Success"
   else:
      return "Unsuccess"

      
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080)