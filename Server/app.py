import json
import os
import time

import mysql.connector
from flask import Flask, jsonify, redirect, render_template, request, send_file
from flask_cors import CORS, cross_origin
from mysql.connector import errors
from werkzeug.utils import secure_filename

import AI.det
import reset_password

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})

face_shapes = ['square', 'round', 'heart', 'oblong', 'oval']
glasses_recomments = ["Oval, Round and Large", "Rectangle, Square and Oval", "Rectangle, Oval and Horn",
                      "Rectangle, Square and Oval", "Rectangle, Oval, Square, Round, Large and Horn"]
con = mysql.connector.connect(user='sql6412381', password='hjYLTWwnfx',
                              host='sql6.freemysqlhosting.net', database='sql6412381')
cursor = con.cursor()


@app.route("/")
def home():
    return render_template("login.html")


@app.route("/adduser")
def adduser():
    return render_template("adduser.html")


@app.route('/upload')
def upload():
    return render_template('upload.html')


@app.route('/uploader/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        path_name = time.time()
        f.save("static/pred/%s.png" % path_name)
        fs = AI.det.process(path_name)
        for i, face_shape in enumerate(face_shapes):
            if fs == face_shape:
                return """
            <head>
               <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia">
               <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Audiowide">
               <style>
                  h1 {
                     font-family: "Sofia", sans-serif;
                     text-shadow: 3px 3px 3px #ababab;
                  }            
                  h3 {
                     font-family: "Audiowide", sans-serif;
                     text-shadow: 1px 1px 1px #ababab;
                  }
                  img {
                     max-width: 15%;
                     min-width: 7%;
                     height: auto;
                  }
               </style>
            </head>
            <img src="/static/pred/"""+str(path_name)+""".png" alt="img">
            <h1> Your face shape is """+face_shape+"""</h1><h3> Glasses recommended for you is  """+glasses_recomments[i]  # +"""</h3> <iframe width="1820" height="400" scrolling="off" src="http://localhost:3000/GlassesShop/Shopping"> </iframe>"""


@app.route('/getinfo/<table>')
def getinfo(table):
    sql = ("select * from " + str(table))
    cursor.execute(sql)
    data = cursor.fetchall()
    return jsonify(data)


@app.route('/getinfobyid/<table>/<column>/<value>')
def getinfobyid(table, column, value):
    sql = ("select * from " + str(table) + " where " + column + " = " + value)
    cursor.execute(sql)
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/countrow/<table>/<column>')
def countrow(table, column):
    sql = ("select COUNT(" + column +")from " + str(table))
    cursor.execute(sql)
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/countrowbyrule/<table>/<column>/<categorytype>')
def countrowbyrule(table, column,categorytype):
    sql = ("select COUNT(" + column +")from " + str(table) + "where category = ('"+categorytype+"')") 
    cursor.execute(sql)
    data = cursor.fetchall()
    return jsonify(data)


@app.route('/getinfowithorderby/<categorytype>/<column>/<value>/<offset>')
def getinfowithorderby(categorytype, column, value, offset):
    sql = ("select * from iteminfo where category in ('"+categorytype+"') ORDER BY "+ column + " " + value+ " LIMIT 12 OFFSET " + offset)
    cursor.execute(sql)
    data = cursor.fetchall()
    return jsonify(data)


@app.route('/getbasketitem/',methods=['GET','POST'])
def getbasketitem():
    message = "fail"
    body = json.loads(request.args.get('body'))
    sql = "select orderinfo.id ,orderinfo.itemid,orderinfo.quanlity,iteminfo.name,iteminfo.price,iteminfo.path,iteminfo.category from `orderinfo` LEFT JOIN `history` ON orderinfo.historyid = history.id LEFT JOIN `iteminfo` ON orderinfo.itemid = iteminfo.GID where uid = \""+str(body.get('uid'))+"\" and status = \""+str(body.get('status'))+"\""
    cursor.execute(sql)
    res = cursor.fetchall()
    if res == []:
        return jsonify(message)
    return jsonify(res)


@app.route('/getpopulate')
def getpopulate():
    sql = ("""SELECT *, COUNT(s.iid) as val from statistics s 
    JOIN iteminfo i on i.GID = s.iid 
    GROUP by i.GID 
    ORDER by val DESC 
    LIMIT 3""")
    time.sleep(1)
    cursor.execute(sql)
    data = cursor.fetchall()
    return jsonify(data)

# @app.route('/sortitem/<table>/<column>/<order>')
# def sortitem(table, column, order):  # order(ASC,DESC)
#     sql = ("select * from " + str(table) + " ORDER BY " + column + " " + order)
#     cursor.execute(sql)
#     data = cursor.fetchall()
#     return jsonify(data)

@app.route('/sortitem/<table>/<column>/<order>/<offset>')
def sortitem(table, column, order, offset):  # order(ASC,DESC)
    sql = ("select * from " + str(table) + " ORDER BY " + column + " " + order + " LIMIT 12 OFFSET " + offset)
    cursor.execute(sql)
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/searchitem/<table>/<name>')
def searchitem(table, name):  
    sql = ("select * from " + str(table) + " Where name LIKE '%"+str(name)+"%'")
    cursor.execute(sql)
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/searchitem1/<table>/<name>')
def searchitem1(table, name):  
    sql = ("select name from " + str(table) + " Where name LIKE '%"+str(name)+"%' GROUP BY name")
    cursor.execute(sql)
    data = cursor.fetchall()
    return jsonify(data)


@app.route('/history/<gid>/<uid>')
def history(gid, uid):  # order(ASC,DESC)
    sql = ("INSERT INTO history() ")
    cursor.execute(sql)
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/sortitem2/<table>/<column>/<order>')
def sortitem2(table, column, order):  # order(ASC,DESC)
    sql = ("select * from " + str(table) +
           " left join itemtype on itemtype.TID = iteminfo.typeid ORDER BY " + column + " " + order)
    cursor.execute(sql)
    data = cursor.fetchall()
    return jsonify(data)


@app.route('/loadimages/<image_path>')
def loadimages(image_path):  # order(ASC,DESC)
    return send_file("static/StockImage/"+image_path+".png", mimetype='image/png')

@app.route('/saveimages/<uid>', methods=['GET', 'POST'])
def saveimages(uid):
    if request.method == 'POST':
        f = request.files['file']
        path = time.time()
        f.save("static/StockImage/%s.png" % path)
        sql = cursor.execute("UPDATE userinfo SET path = "+str(path)+" WHERE id = " +uid)
        cursor.execute(sql)
        con.commit()
        return redirect("http://localhost:3000/GlassesShop/Profile", code=302)

@app.route('/get_image_path/', methods=['GET', 'POST'])
def getimagepath():
    body = json.loads(request.args.get('body'))
    sql = ("select path from userinfo where id = " + body.get('uid'))
    cursor.execute(sql)
    data = cursor.fetchone()
    return jsonify(data)


@app.route('/verify/', methods=['GET', 'POST'])
def verify():
    massage = "404"
    if request.method == "GET":
        body = json.loads(request.args.get('body'))
        cursor.execute("select id,path,role from userinfo where username=\"" +body.get('username')+"\"and pwd=\"" + body.get('pwd')+"\"")
        confirm = cursor.fetchone()
        if confirm is not None:
            massage = confirm
        else:
            massage = "404"
    elif request.method == "POST":
        details = request.form
        cursor.execute("select id,path,role from userinfo where username=\"" +
                       details['username']+"\"and pwd=\"" + details['pwd']+"\"")
        confirm = cursor.fetchone()
        if confirm is not None:
            massage = confirm
        else:
            massage = "404"
    print(massage)
    return jsonify(massage)


@app.route('/insert_userinfo/', methods=['GET', 'POST'])
def insert_userinfo():
    massage = ""
    if request.method == "POST":
        details = request.form
        sql = "INSERT INTO userinfo ( username, pwd, firstname, lastname, email, phone, address ,sex ,dob) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (details['username'], details['pwd'], details['firstname'],
               details['lastname'], details['email'], details['phone'], details['address'], details['sex'])
        try:
            cursor.execute(sql, val)
            con.commit()
        except (errors.DatabaseError,mysql.connector.Error,mysql.connector.errors.IntegrityError) as e:
            return jsonify(e)
        
        massage = "Success"
    elif request.method == "GET":
        body = json.loads(request.args.get('body'))
        sql = "INSERT INTO userinfo (username, pwd, firstname, lastname, email, phone, address ,sex,dob) VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (body.get('username'), body.get('pwd'), body.get('firstname'),
               body.get('lastname'), body.get('email'), body.get('phone'), body.get('address'), body.get('sex'), body.get('dob'))
        try:
            cursor.execute(sql, val)
            con.commit()
        except (errors.DatabaseError,mysql.connector.Error,mysql.connector.errors.IntegrityError) as e:
            return jsonify(e)
        massage = "Success"
    else:
        massage = "Unsuccess"
    print(massage)
    return jsonify(massage)

#ของเดิม
@app.route('/insert_orderinfo/', methods=['GET', 'POST'])
def insert_orderinfo():
    massage = ""
    if request.method == "POST":
        details = request.form
        sql = "INSERT INTO userinfo (status, tracking, userid) VALUES (%s, %s, %s)"
        val = (details['status'], details['tracking'], details['userid'])
        cursor.execute(sql, val)
        con.commit()
        massage = "Success"
    elif request.method == "GET":
        body = json.loads(request.args.get('body'))
        sql = "INSERT INTO userinfo (status, tracking, userid) VALUES ( %s, %s, %s)"
        val = (body.get('status'), body.get('tracking'), body.get('userid'))
        cursor.execute(sql, val)
        con.commit()
        massage = "Success"
    else:
        massage = "Unsuccess"
    return jsonify(massage)

# ของเดิม
@app.route('/insert_history/', methods=['GET', 'POST'])
def insert_history():
    massage = ""
    if request.method == "POST":
        details = request.form
        sql = "INSERT INTO history (item,price,oderid,GID) VALUES (%s, %s, %s, %s)"
        val = (details['item'], details['price'],
               details['oderid'], details['GID'])
        cursor.execute(sql, val)
        con.commit()
        massage = "Success"
    elif request.method == "GET":
        body = json.loads(request.args.get('body'))
        sql = "INSERT INTO history (item,price,oderid,GID) VALUES ( %s, %s, %s, %s)"
        val = (body.get('id'), body.get(
            'item'), body.get('oderid'), body.get('GID'))
        cursor.execute(sql, val)
        con.commit()
        massage = "Success"
    else:
        massage = "Unsuccess"
    return jsonify(massage)


@app.route('/insert_orderinfo2/',methods=['GET','POST'])
def insert_orderinfo2():
    massage = ""
    try:
        if request.method == "GET":
            body = json.loads(request.args.get('body'))
            sql = "INSERT INTO  `orderinfo`(`itemid`, `historyid`, `quanlity`, `unitprice`) VALUES  ('"+str(body.get('iid'))+"','"+str(body.get('orderid'))+"','"+ str(body.get('quanlity'))+"','"+ str(body.get('itemprice'))+"') ON DUPLICATE KEY UPDATE quanlity = (VALUES(quanlity)+'"+str(body.get('quanlity'))+"')"
            cursor.execute(sql)
            con.commit()
            massage = "Success"
        else:
            massage = "Unsuccess"

    except(errors.DatabaseError,mysql.connector.Error,mysql.connector.errors.IntegrityError) as e:
        return jsonify(e)

    return jsonify(massage)

@app.route('/check_oderidinhis/',methods=['GET','POST'])
def check_oderidinhis():
    message = "fail"
    body = json.loads(request.args.get('body'))
    sql2 = "select id from history where uid = \""+str(body.get('uid'))+"\" and status = \""+str(body.get('status'))+"\""
    cursor.execute(sql2)
    res = cursor.fetchall()
    if res == []:
        return jsonify(message)
    return jsonify(res[0])

@app.route('/check_oderidinhis2/',methods=['GET','POST'])
def check_oderidinhis2():
    message = "fail"
    body = json.loads(request.args.get('body'))
    sql2 = "select id from history where uid = \""+str(body.get('uid'))+"\" "
    cursor.execute(sql2)
    res = cursor.fetchall()
    if res == []:
        return jsonify(message)
    return jsonify(res)

@app.route('/insert_history2/', methods=['GET', 'POST'])
def insert_history2():
    massage = ""
    try:
        if request.method == "GET":
            body = json.loads(request.args.get('body'))
            sql = "INSERT INTO history (uid,status,date) VALUES ("+str(body.get('uid'))+", \""+str(body.get('status'))+"\", CURDATE())"
            cursor.execute(sql)
            con.commit()
            massage = "Success"
        else:
            message = "Unsuccess"
    except (errors.DatabaseError,mysql.connector.Error,mysql.connector.errors.IntegrityError) as e:
        return jsonify(e)

    return jsonify(massage)


@app.route('/insert_statistics/', methods=['GET', 'POST'])
def insert_statistics():
    massage = ""
    if request.method == "POST":
        details = request.form
        sql = "INSERT INTO statistics (iid,uid) VALUES (%s, %s)"
        val = (details['iid'], details['uid'])
        cursor.execute(sql, val)
        con.commit()
        massage = "Success"
    elif request.method == "GET":
        body = json.loads(request.args.get('body'))
        sql = "INSERT INTO statistics (iid,uid) VALUES (%s, %s)"
        val = (body.get('iid'), body.get('uid'))
        cursor.execute(sql, val)
        con.commit()
        massage = "Success"
    else:
        massage = "Unsuccess"
    return jsonify(massage)

@app.route('/changepassword', methods=['GET', 'POST'])
def changepassword():
    if request.method == "GET":
        body = json.loads(request.args.get('body'))
        cursor.execute("select email,id from userinfo where userinfo.email =  " + "\""+str(body.get('email'))+ "\"")
        confirm = cursor.fetchone()
        if confirm is not None:
            reset_password.email(confirm[0],confirm[1])
            return jsonify("Success")
        else:
           return jsonify("404")

@app.route('/updatepassword', methods=['GET', 'POST'])
def updatepassword():
    if request.method == "GET":
        body = json.loads(request.args.get('body'))
        print(body)
        cursor.execute("UPDATE userinfo SET pwd = " + "\""+str(body.get('pwd'))+ "\"" +" WHERE id = "+str(body.get('uid')))
        con.commit()
        return jsonify("Success")
    return jsonify("404")
    
#ยังไม่ได้ test
@app.route('/updateuserinfo', methods=['GET', 'POST'])
def updateuserinfo():
    if request.method == "GET":
        body = json.loads(request.args.get('body'))
        print(body)
        cursor.execute("UPDATE userinfo SET firstname = " + "\""+str(body.get('firstname'))+ "\"" 
        + ", lastname = " + "\""+str(body.get('lastname'))+ "\"" 
        + ", email = " + "\""+str(body.get('email'))+ "\"" 
        + ", phone = " + "\""+str(body.get('phone'))+ "\"" 
        + ", address = " + "\""+str(body.get('address'))+ "\"" 
        + ", sex = " + "\""+str(body.get('sex'))+ "\"" 
        + ", dob = " + "\""+str(body.get('dob'))+ "\"" 
        +" WHERE id = " +str(body.get('uid')))
        con.commit()
        return jsonify("Success")
    return jsonify("404")


@app.route('/interes_gender')
def interes_gender():
    cursor.execute("""select CONCAT(u.sex , i.category ) as c,i.category,COUNT(CONCAT(u.sex , i.category )) as Counter,u.sex from `statistics` s LEFT JOIN `userinfo` u ON u.id = s.uid LEFT JOIN `iteminfo` i ON i.GID = s.iid GROUP BY c""")
    confirm = cursor.fetchall()
    if confirm is not None:
        return jsonify(confirm)
    else:
        return jsonify("404")


@app.route('/interes_age_range')
def interes_age_range():
    cursor.execute("""select CONCAT(year(u.dob) , i.category ) as c ,i.category,COUNT(CONCAT(u.dob , i.category )),year(u.dob)  from `statistics` s
LEFT JOIN `userinfo` u ON u.id = s.uid 
LEFT JOIN `iteminfo` i ON i.GID = s.iid 
GROUP BY c""")
    confirm = cursor.fetchall()
    if confirm is not None:
        return jsonify(confirm)
    else:
        return jsonify("404")

@app.route('/interes_time')
def interes_time():
    cursor.execute("""select Hour(s.dt),COUNT(Hour(s.dt))
from `statistics` s
GROUP by Hour(s.dt)""")
    confirm = cursor.fetchall()
    if confirm is not None:
        return jsonify(confirm)
    else:
        return jsonify("404")

@app.route('/interes_person')
def interes_person():
    cursor.execute("""select COUNT(s.sid) , i.category  from `statistics` s
LEFT JOIN `iteminfo` i ON i.GID = s.iid
GROUP BY i.category""")
    confirm = cursor.fetchall()
    if confirm is not None:
        return jsonify(confirm)
    else:
        return jsonify("404")

@app.route('/solditem')
def solditem():
    cursor.execute("""select i.category,sum(o.quanlity)  from `orderinfo` o LEFT JOIN `iteminfo` i ON i.GID = o.itemid GROUP BY i.category""")
    confirm = cursor.fetchall()
    str_con = []
    for i in range(len(confirm)):
        str_con.append([str(confirm[i][0]),str(confirm[i][1])]) 
    print(str_con)
    if str_con is not None:
        return json.dumps(str_con)
    else:
        return jsonify("404")

'''
เพศสนใจของแว่นแต่ละประเภท 
select CONCAT(u.sex , i.category ) as c ,i.category,COUNT(CONCAT(u.sex , i.category )),u.sex  from `statistics` s
LEFT JOIN `userinfo` u ON u.id = s.uid 
LEFT JOIN `iteminfo` i ON i.GID = s.iid 
GROUP BY c

ช่วงอายุสนใจของแว่นแต่ละประเภท 
select CONCAT(u.dob , i.category ) as c ,i.category,COUNT(CONCAT(u.dob , i.category )),year(u.dob)  from `statistics` s
LEFT JOIN `userinfo` u ON u.id = s.uid 
LEFT JOIN `iteminfo` i ON i.GID = s.iid 
GROUP BY c 

ช่วงเวลาที่คนเข้าชมสินคัา(กราฟ)
select Hour(s.dt),COUNT(Hour(s.dt))
from `statistics` s
GROUP by Hour(s.dt)

จำนวนยอดคนสนใจของแว่นแต่ละประเภท
select COUNT(s.sid) , i.category  from `statistics` s
LEFT JOIN `iteminfo` i ON i.GID = s.iid
GROUP BY i.category


จำนวนยอดขายของแว่นแต่ละประเภท
select i.category,sum(o.quanlity)  from `orderinfo` o
LEFT JOIN `iteminfo` i ON i.GID = o.itemid GROUP BY i.category
'''

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)
