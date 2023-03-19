import 'dart:convert';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_overlay_loader/flutter_overlay_loader.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:http_parser/http_parser.dart';
import 'package:image_picker/image_picker.dart';
import 'package:dotted_border/dotted_border.dart';
import 'package:trinity/screens/analysis_screen.dart';
import 'package:trinity/screens/predict_severity_screen.dart';
import 'package:trinity/utils/constants.dart';
import 'package:http/http.dart' as http;

class DetailsScreen extends StatefulWidget {
  const DetailsScreen({super.key});

  @override
  State<DetailsScreen> createState() => _DetailsScreenState();
}

class _DetailsScreenState extends State<DetailsScreen> {
  /// Variables
  File? imageFile;
  final formKey = GlobalKey<FormState>();
  InputDecoration _commonInputDecoration(String hintText) {
    // final toggleStateService = Provider.of<ToggleStateProvider>(context);
    return InputDecoration(
      // suffixIcon: inputText == "password"
      //     ? InkWell(
      //         child: Icon(toggleStateService.state ? Icons.visibility_off : Icons.visibility),
      //         onTap: () {
      //           toggleStateService.toggle();
      //         },
      //       )
      //     : null,
      hintText: hintText,

      hintStyle: TextStyle(color: Colors.grey[500], fontSize: 15),
      // isDense: true,
      contentPadding: const EdgeInsets.fromLTRB(10, 8, 10, 8),
      enabledBorder: OutlineInputBorder(
        borderRadius: const BorderRadius.all(Radius.circular(10.0)),
        borderSide: BorderSide(color: ktextInputBorderColor, width: 2.0),
      ),
      focusedErrorBorder: const OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(10.0)),
        borderSide: BorderSide(color: Colors.red, width: 2.0),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: const BorderRadius.all(Radius.circular(10.0)),
        borderSide: BorderSide(color: ktextInputBorderColor, width: 2.0),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: const BorderRadius.all(Radius.circular(10.0)),
        borderSide: BorderSide(color: ktextInputBorderColor, width: 2.0),
      ),
    );
  }

  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _pHController = TextEditingController();
  final TextEditingController _paCO2Controller = TextEditingController();
  final TextEditingController _hCO3Controller = TextEditingController();
  final TextEditingController _nAController = TextEditingController();
  final TextEditingController _kController = TextEditingController();
  final TextEditingController _cLController = TextEditingController();
  final TextEditingController _lactateController = TextEditingController();
  final TextEditingController _albuminController = TextEditingController();
  final TextEditingController _weightlController = TextEditingController();

  Future<void> getData(BuildContext context) async {
    Dio dio = new Dio();
    FormData formData = new FormData.fromMap({
      "myfile": await MultipartFile.fromFile(imageFile!.path, filename: "dummyfile"),
    });

    try {
      Loader.show(context, progressIndicator: CircularProgressIndicator(color: Colors.blue));
      Response response = await dio.post(
        "https://istart-ml-yfdjbh463q-uc.a.run.app/ocr",
        data: formData,
        options: Options(
          headers: {
            HttpHeaders.acceptHeader: "application/json",
            HttpHeaders.acceptLanguageHeader: "en-US, en;q=0.8",
            HttpHeaders.contentTypeHeader: "multipart/form-data",
          },
        ),
      );
      print(response.data);
      Loader.hide();
      var res = jsonDecode(response.data);
      _nAController.text = res["Na"];
      _pHController.text = res["pH"];
      _paCO2Controller.text = res["pCO2"];
      _hCO3Controller.text = res["HCO3"];
      _kController.text = res["K"];
      _cLController.text = res["Cl"];
      // _nAController.text = res["Na"];
    } catch (e) {
      print(e.toString());
      Loader.hide();
    }
  }

  Future<void> getDisorder(BuildContext context) async {
    try {
      Loader.show(context, progressIndicator: CircularProgressIndicator(color: Colors.blue));
      final response = await http.post(
        Uri.parse('http://localhost:4000/api/acid-base/predict'),
        body: {
          "pH": "${double.parse(_pHController.text)}",
          "CO2": "${double.parse(_paCO2Controller.text)}",
          "HCO3": "${double.parse(_hCO3Controller.text)}",
          "Na": "${double.parse(_nAController.text)}",
          "K": "${double.parse(_kController.text)}",
          "Cl": "${double.parse(_cLController.text)}",
          "weight": "${double.parse(_weightlController.text)}",
          "Albumin": "${double.parse(_albuminController.text)}",
          "Lactate": "${double.parse(_lactateController.text)}",
          "patient_name": _nameController.text,
          "patient_email": _emailController.text,
          "ref_doctor_email": "shahmanan170602@gmail.com",
        },
      );

      // print(response.body);
      if (response.statusCode == 200) {
        Loader.hide();
        var body = json.decode(response.body);
        print(body);
        Navigator.push(context, MaterialPageRoute(builder: (context) {
          return AnalysisScreen(
            disorder: body["data"]["disorder"],
            baseExcess: body["data"]["base_excess"],
            sodiumbaseExcess: body["data"]["Sodium_base_excess"],
            albuminbaseExcess: body["data"]["Albumin_base_excess"],
            lactatebaseExcess: body["data"]["Lactate_base_excess"],
            otherionsbaseExess: body["data"]["other_ions_base_excess"],
          );
        }));
      } else {
        Loader.hide();
        print(response.statusCode);
      }
    } catch (e) {
      print(e.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 1,
        title: Text(
          "Determine Acid Base Disorders",
          style: TextStyle(color: Colors.white, fontSize: 18),
        ),
      ),
      body:
          // if(ima)
          SingleChildScrollView(
        physics: BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
        child: Column(
          children: [
            imageFile == null
                ? Container(
                    margin: EdgeInsets.all(12),
                    child: InkWell(
                      onTap: () {
                        _getFromGallery();
                      },
                      child: DottedBorder(
                        color: Colors.grey,
                        borderType: BorderType.RRect,
                        radius: Radius.circular(8),
                        dashPattern: [5, 3],
                        strokeWidth: 1,
                        child: Container(
                          height: 100,
                          // width: MediaQuery.of(context).size.width - 60,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: const [
                              Flexible(
                                child: Text(
                                  "Upload Attachment",
                                  // fileName != null
                                  //     ? fileName!
                                  //     : 'Upload attachment',
                                  textAlign: TextAlign.center,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    // child: imageFile == null
                    //     ? Container(
                    //         alignment: Alignment.center,
                    //         child: Column(
                    //           mainAxisAlignment: MainAxisAlignment.center,
                    //           children: <Widget>[
                    //             TextButton(
                    //               // backcolor: Colors.greenAccent,
                    //               onPressed: () {
                    //                 _getFromGallery();
                    //               },
                    //               child: Text("PICK FROM GALLERY"),
                    //             ),
                    //             Container(
                    //               height: 40.0,
                    //             ),
                    //             TextButton(
                    //               // color: Colors.lightGreenAccent,
                    //               onPressed: () {
                    //                 _getFromCamera();
                    //               },
                    //               child: Text("PICK FROM CAMERA"),
                    //             )
                    //           ],
                    //         ),
                    //       )
                    //     : Container(
                    //         child: Image.file(
                    //           imageFile!,
                    //           fit: BoxFit.cover,
                    //         ),
                    //       ),
                  )
                : Container(
                    margin: EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.blue),
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(10.0),
                      // borderRadius: BorderRadius.circular(20.0)
                      child: Container(
                        // margin: EdgeInsets.all(8),
                        // padding: EdgeInsets.all(25),
                        width: MediaQuery.of(context).size.width,
                        // decoration: BoxDecoration(borderRadius: BorderRadius.circular(20.0)),
                        child: Align(
                          alignment: Alignment.center,
                          // widthFactor: 1,
                          heightFactor: 0.2,
                          child: Image.file(
                            imageFile!,
                            fit: BoxFit.fill,
                          ),
                        ),
                      ),
                    ),
                  ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  margin: EdgeInsets.only(left: 12),
                  child: InkWell(
                    onTap: () {
                      Navigator.push(context, MaterialPageRoute(builder: (context) {
                        return PredicSeverity();
                      }));
                    },
                    child: Container(
                      margin: EdgeInsets.only(right: 12),
                      padding: EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                      decoration: BoxDecoration(color: Colors.blue, borderRadius: BorderRadius.circular(5.0)),
                      child: Text(
                        "Predict Severity",
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                ),
                InkWell(
                  onTap: () {
                    print("working");
                    getData(context);
                  },
                  child: Container(
                    margin: EdgeInsets.only(right: 12),
                    padding: EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                    decoration: BoxDecoration(color: Colors.blue, borderRadius: BorderRadius.circular(5.0)),
                    child: Text(
                      "Get Data",
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
              ],
            ),
            Form(
              key: formKey,
              child: Column(
                children: [
                  Container(
                    // height: 65,
                    margin: EdgeInsets.only(left: 12, right: 12, top: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Enter Patient Name",
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(
                          height: 8,
                        ),
                        TextFormField(
                          controller: _nameController,
                          decoration: _commonInputDecoration("eg. Yash Shah"),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    // height: 65,
                    margin: EdgeInsets.only(left: 12, right: 12, top: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Enter Patient Email",
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(
                          height: 8,
                        ),
                        TextFormField(
                          controller: _emailController,
                          decoration: _commonInputDecoration("eg. yash@gmail.com"),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    // height: 65,
                    margin: EdgeInsets.only(left: 12, right: 12, top: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Enter pH value",
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(
                          height: 8,
                        ),
                        TextFormField(
                          controller: _pHController,
                          decoration: _commonInputDecoration("eg. 7.6"),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    // height: 65,
                    margin: EdgeInsets.only(left: 12, right: 12, top: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Enter PaCO2 value (in mmHg)",
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(
                          height: 8,
                        ),
                        TextFormField(
                          controller: _paCO2Controller,
                          keyboardType: TextInputType.number,
                          decoration: _commonInputDecoration("eg. 23"),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    // height: 65,
                    margin: EdgeInsets.only(left: 12, right: 12, top: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Enter HCO3 value (in mmol/L)",
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(
                          height: 8,
                        ),
                        TextFormField(
                          controller: _hCO3Controller,
                          keyboardType: TextInputType.number,
                          decoration: _commonInputDecoration("eg. 10"),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    // height: 65,
                    margin: EdgeInsets.only(left: 12, right: 12, top: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Enter Na+ value (in mmol/L)",
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(
                          height: 8,
                        ),
                        TextFormField(
                          controller: _nAController,
                          keyboardType: TextInputType.number,
                          decoration: _commonInputDecoration("eg. 140"),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    // height: 65,
                    margin: EdgeInsets.only(left: 12, right: 12, top: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Enter K+ value (in mmol/L)",
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(
                          height: 8,
                        ),
                        TextFormField(
                          controller: _kController,
                          keyboardType: TextInputType.number,
                          decoration: _commonInputDecoration("eg. 0"),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    // height: 65,
                    margin: EdgeInsets.only(left: 12, right: 12, top: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Enter Cl- value (in mmol/L)",
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(
                          height: 8,
                        ),
                        TextFormField(
                          controller: _cLController,
                          keyboardType: TextInputType.number,
                          decoration: _commonInputDecoration("eg. 100"),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    // height: 65,
                    margin: EdgeInsets.only(left: 12, right: 12, top: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Enter Lactate value (in mmol/L)",
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(
                          height: 8,
                        ),
                        TextFormField(
                          controller: _lactateController,
                          keyboardType: TextInputType.number,
                          decoration: _commonInputDecoration("eg. 11"),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    // height: 65,
                    margin: EdgeInsets.only(left: 12, right: 12, top: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Enter Albumin value (in g/L)",
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(
                          height: 8,
                        ),
                        TextFormField(
                          controller: _albuminController,
                          keyboardType: TextInputType.number,
                          decoration: _commonInputDecoration("eg. 21"),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    // height: 65,
                    margin: EdgeInsets.only(left: 12, right: 12, top: 10, bottom: 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Enter weight value in kgs",
                          style: TextStyle(
                            color: Colors.black,
                          ),
                        ),
                        SizedBox(
                          height: 8,
                        ),
                        TextFormField(
                          controller: _weightlController,
                          keyboardType: TextInputType.number,
                          decoration: _commonInputDecoration("eg. 34"),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            InkWell(
              onTap: () async {
                await getDisorder(context);
                // Future.delayed(Duration(seconds: 1));
                // if (statusCode == 200) {

                // }
              },
              child: Container(
                color: Colors.blue,
                padding: EdgeInsets.only(top: 15, bottom: 15),
                width: double.infinity,
                child: Text(
                  "Submit",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  _getFromGallery() async {
    XFile? pickedFile = await ImagePicker().pickImage(
      source: ImageSource.gallery,
      maxWidth: 1800,
      maxHeight: 1800,
    );
    if (pickedFile != null) {
      setState(() {
        imageFile = File(pickedFile.path);
      });
    }
  }

  /// Get from Camera
  _getFromCamera() async {
    XFile? pickedFile = await ImagePicker().pickImage(
      source: ImageSource.camera,
      maxWidth: 1800,
      maxHeight: 1800,
    );
    if (pickedFile != null) {
      setState(() {
        imageFile = File(pickedFile.path);
      });
    }
  }
}
