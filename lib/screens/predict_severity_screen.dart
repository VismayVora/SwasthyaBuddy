import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_overlay_loader/flutter_overlay_loader.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:trinity/utils/constants.dart';
import 'package:http/http.dart' as http;

class PredicSeverity extends StatefulWidget {
  const PredicSeverity({super.key});

  @override
  State<PredicSeverity> createState() => _PredicSeverityState();
}

class _PredicSeverityState extends State<PredicSeverity> {
  final formKey = GlobalKey<FormState>();

  Future<void> predictStage(BuildContext context) async {
    try {
      Loader.show(context, progressIndicator: CircularProgressIndicator(color: Colors.blue));
      final response = await http.post(Uri.parse('https://istart-ml-yfdjbh463q-uc.a.run.app/predict'),
          body: jsonEncode({
            "AGE": "${_ageController.text}",
            "FEV1": "${_fev1Controller.text}",
            "FEV1PRED": "${_fev1PredController.text}",
            "FVC": "${_fvcController.text}",
            "FVCPRED": "${_fvcPredController.text}",
            "SGRQ": "${_sgrqController.text}",
            "AGEquartiles": "${_ageQuartilesController.text}",
            "gender": "${_genderController.text}",
            "smoking": "${_smokingController.text}",
            "Diabetes": "${_diabetesController.text}",
            "muscular": "${_muscularController.text}",
            "hypertension": "${_hyperTensionController.text}",
            "AtrialFib": "${_atrialFibController.text}",
            "IHD": "${_ihdController.text}"
          }));

      print(response.body);
      if (response.statusCode == 200) {
        Loader.hide();
        var body = json.decode(response.body);
        print(body);
        String? stage;
        switch (body) {
          case 1:
            stage = "Mild";
            break;
          case 2:
            stage = "Moderate";
            break;
          case 3:
            stage = "Severe";
            break;
          case 4:
            stage = "Very Severe";
            break;
          default:
            break;
        }
        Dialog successDialog = Dialog(
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(7.46365)), //this right here
          child: Container(
            height: 180.0,
            width: 351.0,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                InkWell(
                  onTap: () {
                    Navigator.pop(context);
                  },
                  child: Padding(
                    padding: const EdgeInsets.only(top: 16.0),
                    child: Align(
                      alignment: Alignment(0.85, 0),
                      child: SvgPicture.asset(
                        "assets/images/x.svg",
                        color: Color(0xff565656),
                        width: 16.42,
                        height: 16.42,
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(top: 22.0, left: 15, right: 15),
                  child: Text(
                    'Your diagnosis severity is ${stage!}. Please consult a doctor for further treatment',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.blue, fontSize: 18),
                    // style: GoogleFonts.ptSans(
                    //     textStyle: const TextStyle(
                    //         color: Colors.white, fontSize: 16, fontWeight: FontWeight.w700, letterSpacing: 1)),
                  ),
                ),
              ],
            ),
          ),
        );

        // Navigator.push(context, MaterialPageRoute(builder: (context) {
        //   return AnalysisScreen(
        //     disorder: body["data"]["disorder"],
        //     baseExcess: body["data"]["base_excess"],
        //     sodiumbaseExcess: body["data"]["Sodium_base_excess"],
        //     albuminbaseExcess: body["data"]["Albumin_base_excess"],
        //     lactatebaseExcess: body["data"]["Lactate_base_excess"],
        //     otherionsbaseExess: body["data"]["other_ions_base_excess"],
        //   );
        // }));

        showDialog(context: context, builder: (context) => successDialog);
      } else {
        Loader.hide();
        print(response.statusCode);
      }
    } catch (e) {
      print(e.toString());
    }
  }

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

  final TextEditingController _ageController = TextEditingController();
  final TextEditingController _fev1Controller = TextEditingController();
  final TextEditingController _fev1PredController = TextEditingController();
  final TextEditingController _fvcController = TextEditingController();
  final TextEditingController _fvcPredController = TextEditingController();
  final TextEditingController _sgrqController = TextEditingController();
  final TextEditingController _ageQuartilesController = TextEditingController();
  final TextEditingController _genderController = TextEditingController();
  final TextEditingController _smokingController = TextEditingController();
  final TextEditingController _diabetesController = TextEditingController();
  final TextEditingController _muscularController = TextEditingController();
  final TextEditingController _hyperTensionController = TextEditingController();
  final TextEditingController _atrialFibController = TextEditingController();
  final TextEditingController _ihdController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 1,
        titleSpacing: 0,
        title: Text(
          "Predict COPD Severity",
          style: TextStyle(color: Colors.white, fontSize: 18),
        ),
      ),
      body: SingleChildScrollView(
        // child: Col,
        physics: BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
        child: Form(
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
                      "Enter Age",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _ageController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 18"),
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
                      "Enter FEV1",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _fev1Controller,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 1.20"),
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
                      "Enter FEV1PRED",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _fev1PredController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 70"),
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
                      "Enter FVC",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _fvcController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 2.0"),
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
                      "Enter FVCPRED",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _fvcPredController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 50"),
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
                      "Enter SGRQ",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _sgrqController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 40"),
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
                      "Enter AgeQuartiles",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _ageQuartilesController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 2"),
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
                      "Enter Gender",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _genderController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 1 for male and 2 for female"),
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
                      "Enter Smoking",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _smokingController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 1 for No and 2 for Yes"),
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
                      "Enter Diabetes",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _diabetesController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 1 for No and 2 for Yes"),
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
                      "Enter Muscular",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _muscularController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 1 for No and 2 for Yes"),
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
                      "Enter Hypertension",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _hyperTensionController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 1 for No and 2 for Yes"),
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
                      "Enter AtrialFib",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _atrialFibController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 1 for No and 2 for Yes"),
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
                      "Enter IHD",
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    TextFormField(
                      controller: _ihdController,
                      keyboardType: TextInputType.number,
                      decoration: _commonInputDecoration("eg. 1 for No and 2 for Yes"),
                    ),
                  ],
                ),
              ),
              InkWell(
                onTap: () async {
                  // await getDisorder(context);
                  // Future.delayed(Duration(seconds: 1));
                  // if (statusCode == 200) {
                  predictStage(context);
                  // }
                },
                child: Container(
                  color: Colors.blue,
                  padding: EdgeInsets.only(top: 15, bottom: 15),
                  width: double.infinity,
                  child: Text(
                    "Predict",
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
      ),
    );
  }
}
