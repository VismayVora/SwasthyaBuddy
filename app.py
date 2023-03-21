from flask import Flask, request
import pickle
from flask_cors import CORS, cross_origin
import re
import boto3
import os
import json

app = Flask(__name__)
cors = CORS(app, resources={r'/api/*': {'origins': '*'}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'jose'

textractclient = boto3.client("textract", aws_access_key_id="",
                              aws_secret_access_key="", region_name="ap-south-1")


@app.after_request
def apply_caching(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET,HEAD,OPTIONS,POST,PUT"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    response.headers["Access-Control-Max-Age"] = "86400"
    return response


model = pickle.load(open('model.pkl', 'rb'))


@app.route('/')
def home():
    return ("Hi!")


@app.route('/predict', methods=['POST'])
def predict():
    val = request.get_json(force=True)
    print(type(val['FVC']))
    AGE = int(val['AGE'])
    FEV1 = float(val['FEV1'])
    FEV1PRED = float(val['FEV1PRED'])
    FVC = float(val['FVC'])
    FVCPRED = int(val['FVCPRED'])
    SGRQ = float(val['SGRQ'])
    AGEquartiles = int(val['AGEquartiles'])
    gender = int(val['gender'])
    smoking = int(val['smoking'])
    Diabetes = int(val['Diabetes'])
    muscular = int(val['muscular'])
    hypertension = int(val['hypertension'])
    AtrialFib = int(val['AtrialFib'])
    IHD = int(val['IHD'])

    output = model.predict([[AGE, FEV1, FEV1PRED, FVC, FVCPRED, SGRQ, AGEquartiles,
                           gender, smoking, Diabetes, muscular, hypertension, AtrialFib, IHD]])[0]
    if (output == 0):
        return ("1")
    elif (output == 1):
        return ("2")
    elif (output == 2):
        return ("3")
    else:
        return ("4")


@app.route('/ocr', methods=['POST'])
@cross_origin(origin='*')
def getValues():
    file = request.files.get("myfile")
    binaryFile = file.read()

    response = textractclient.detect_document_text(
        Document={
            'Bytes': binaryFile,
        }
    )

    ans = {}

    for i in range(0, len(response['Blocks'])):
        if (response['Blocks'][i]["BlockType"]) == "LINE":
            if (response['Blocks'][i]["Text"] == "pH"):
                ans['pH'] = response['Blocks'][i+1]["Text"]
                # extractedText=" pH "+extractedText+response['Blocks'][i+1]["Text"]+" "
            if (response['Blocks'][i]["Text"] == "pCO2"):
                x = response['Blocks'][i+1]["Text"]
                x = re.sub("[^\d\.]", "", x)
                ans['pCO2'] = x
            if ("Na" in response['Blocks'][i]["Text"] or "Sodium" in response['Blocks'][i]["Text"]):
                x = response['Blocks'][i+1]["Text"]
                x = re.sub("[^\d\.]", "", x)
                ans['Na'] = x
            if ("cHCO" in response['Blocks'][i]["Text"] or "HCO3" in response['Blocks'][i]["Text"]):
                x = response['Blocks'][i+1]["Text"]
                x = re.sub("[^\d\.]", "", x)
                ans['HCO3'] = x
            if ("cK" in response['Blocks'][i]["Text"] or "Potassium" in response['Blocks'][i]["Text"]):
                x = response['Blocks'][i+1]["Text"]
                x = re.sub("[^\d\.]", "", x)
                ans['K'] = x
            if ("cCl" in response['Blocks'][i]["Text"] or "cCI" in response['Blocks'][i]["Text"] or "Chloride" in response['Blocks'][i]["Text"] or "cCh" in response['Blocks'][i]["Text"]):
                x = response['Blocks'][i+1]["Text"]
                x = re.sub("[^\d\.]", "", x)
                ans['Cl'] = x

    jsonData = json.dumps(ans)
    return (jsonData)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get('PORT', 8080)))
