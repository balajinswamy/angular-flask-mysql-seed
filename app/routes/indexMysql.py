from app import app
from flask import Flask
from flask import g, Response, request

import json
import MySQLdb
import logging
import config

app.config['APPLICATION_ROOT'] = '/api/v1'

@app.before_request
def db_connect():
  
  g.conn = MySQLdb.connect(host=config.host,
                              user=config.user,
                              passwd=config.passwd,
                              db=config.db)
  g.cursor = g.conn.cursor()

@app.after_request
def db_disconnect(response):
  g.cursor.close()
  g.conn.close()
  return response

def query_db(query, args=(), one=False):
  g.cursor.execute(query, args)
  rv = [dict((g.cursor.description[idx][0], value)
  for idx, value in enumerate(row)) for row in g.cursor.fetchall()]
  return (rv[0] if rv else None) if one else rv

def call_proc(proc, args=()):
  result = g.cursor.callproc(proc,args)
  return result

@app.route("/")
def index():
  return 'The URL for this page is /api/v1'

@app.route("/api/v1")
def hello():
  return "This website is all about cars!!!"


@app.route("/api/v1/names", methods=['POST','GET'])
def names():
  #flask has a shortcut for JSON!!
  _vsn = request.json.get('vsn')
  
  #todo:Based on the description of the problem, we should just be able to query based on the REGEX.  
  #     Are we going to get the close match or an exact match
  result = query_db("select *, length(vsn) - length(REPLACE(vsn, '*', '')) from vsn_details where vsn REGEXP '[ZZRCAV*]{6}[999451*]{6}'"
  "order by length(vsn) - length(REPLACE(vsn, '*', ''))")

  # DELIMITER $$
  # CREATE DEFINER=`root`@`localhost` PROCEDURE `getVSNInfo`(in i_vsn char(12))
  # BEGIN
  #    SELECT vsn, trim, year, make, model, trim_name FROM vsn_details
  #    where SUBSTRING(vsn,1,1) in (SUBSTRING(i_vsn,1,1), '*')
  #    and SUBSTRING(vsn,2,1) in (SUBSTRING(i_vsn,2,1), '*')
  #    and SUBSTRING(vsn,3,1) in (SUBSTRING(i_vsn,3,1), '*')
  #    and SUBSTRING(vsn,4,1) in (SUBSTRING(i_vsn,4,1), '*')
  #    and SUBSTRING(vsn,5,1) in (SUBSTRING(i_vsn,5,1), '*')
  #    and SUBSTRING(vsn,6,1) in (SUBSTRING(i_vsn,6,1), '*')
  #    and SUBSTRING(vsn,7,1) in (SUBSTRING(i_vsn,7,1), '*')
  #    and SUBSTRING(vsn,8,1) in (SUBSTRING(i_vsn,8,1), '*')
  #    and SUBSTRING(vsn,9,1) in (SUBSTRING(i_vsn,9,1), '*')
  #    and SUBSTRING(vsn,10,1) in (SUBSTRING(i_vsn,10,1), '*')
  #    and SUBSTRING(vsn,11,1) in (SUBSTRING(i_vsn,11,1), '*')
  #    and SUBSTRING(vsn,12,1) in (SUBSTRING(i_vsn,12,1), '*')
  #    order by length(vsn) - length(REPLACE(vsn, '*', ''))
  #    limit 0,1;    
  # END $$
  # DELIMITER ;
  if _vsn:
    result = query_db("CALL getVSNInfo('{0}')".format(_vsn))
    data = json.dumps(result)
    resp = Response(data, status=200, mimetype='application/json')
    return resp
  else:
    return json.dumps({'html':'<span>Enter the required fields</span>'})
    
@app.route("/add", methods=['POST'])
def add():
  req_json = request.get_json()
  g.cursor.execute("INSERT INTO truecar.vsn_details (firstname, lastname) VALUES (%s,%s)", (req_json['firstname'], req_json['lastname']))
  g.conn.commit()
  resp = Response("Updated", status=201, mimetype='application/json')
  return resp

@app.route("/api/v1/names2", methods=['POST','GET'])
def names2():

  #flask has a shortcut for JSON
  _vsn = request.json.get('vsn')

  # logging.info("SELECT vsn, trim, year, make, model, trim_name FROM vsn_details "
  # "where SUBSTRING(vsn,1,1) in (SUBSTRING(?,1,1), '*') "
  # "and SUBSTRING(vsn,2,1) in (SUBSTRING(?,2,1), '*') "
  # "and SUBSTRING(vsn,3,1) in (SUBSTRING(?,3,1), '*') "
  # "and SUBSTRING(vsn,4,1) in (SUBSTRING(?,4,1), '*') "
  # "and SUBSTRING(vsn,5,1) in (SUBSTRING(?,5,1), '*') "
  # "and SUBSTRING(vsn,6,1) in (SUBSTRING(?,6,1), '*') "
  # "and SUBSTRING(vsn,7,1) in (SUBSTRING(?,7,1), '*') "
  # "and SUBSTRING(vsn,8,1) in (SUBSTRING(?,8,1), '*') "
  # "and SUBSTRING(vsn,9,1) in (SUBSTRING(?,9,1), '*') "
  # "and SUBSTRING(vsn,10,1) in (SUBSTRING(?,10,1), '*') "
  # "and SUBSTRING(vsn,11,1) in (SUBSTRING(?,11,1), '*') "
  # "and SUBSTRING(vsn,12,1) in (SUBSTRING(?,12,1), '*') "
  # "order by length(vsn) - length(REPLACE(vsn, '*', '')) "
  # "limit 0,1",_vsn)

  result = query_db("select * from vsn_details limit 0,1")
  
  # _j = json.load(_vsn)
  # _vsn = request.form
  # logging.info(json.dumps(_vsn))
  # if _vsn:
  #   result = query_db("SELECT vsn, trim, year, make, model, trim_name FROM vsn_details limit 0,1")
  data = json.dumps(_vsn)
  # data = json.load(request.json)
  # data = json.dumps(result)
  # result = call_proc('new_procedure', (data,))
  result = query_db("CALL new_procedure('{0}')".format(data))
  resp = Response(json.dumps(result), status=200, mimetype='application/json')
  return resp
  # else:
  #   return json.dumps({'html':'<span>Enter the required fields</span>'})