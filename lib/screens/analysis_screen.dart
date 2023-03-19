import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class AnalysisScreen extends StatefulWidget {
  const AnalysisScreen(
      {super.key,
      required this.disorder,
      required this.baseExcess,
      required this.sodiumbaseExcess,
      required this.albuminbaseExcess,
      required this.lactatebaseExcess,
      required this.otherionsbaseExess});
  final String disorder;
  final double baseExcess;
  final int sodiumbaseExcess;
  final double albuminbaseExcess;
  final int lactatebaseExcess;
  final double otherionsbaseExess;

  @override
  State<AnalysisScreen> createState() => _AnalysisScreenState();
}

class _AnalysisScreenState extends State<AnalysisScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 1,
        titleSpacing: 0,
        title: Text(
          "Report",
          style: TextStyle(color: Colors.white, fontSize: 18),
        ),
      ),
      body: Container(
        margin: EdgeInsets.symmetric(horizontal: 15, vertical: 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          // mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Container(
            //   // margin: EdgeInsets.only(top: 15),
            //   child: Text(
            //     "Report",
            //     style: TextStyle(color: Colors.blue, fontSize: 24, fontWeight: FontWeight.w600),
            //   ),
            // ),
            Container(
              margin: EdgeInsets.only(top: 20),
              child: RichText(
                text: TextSpan(children: [
                  TextSpan(
                    text: "Disorder : ",
                    style: TextStyle(color: Colors.black, fontSize: 18, fontWeight: FontWeight.w400),
                  ),
                  TextSpan(
                    text: "${widget.disorder}",
                    style: TextStyle(color: Colors.blue, fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                ]),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 15),
              child: RichText(
                text: TextSpan(children: [
                  TextSpan(
                    text: "Base Excess : ",
                    style: TextStyle(color: Colors.black, fontSize: 18, fontWeight: FontWeight.w400),
                  ),
                  TextSpan(
                    text: "${widget.baseExcess}",
                    style: TextStyle(color: Colors.blue, fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                ]),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 10),
              child: RichText(
                text: TextSpan(children: [
                  TextSpan(
                    text: "Sodium Base Excess : ",
                    style: TextStyle(color: Colors.black, fontSize: 18, fontWeight: FontWeight.w400),
                  ),
                  TextSpan(
                    text: "${widget.sodiumbaseExcess}",
                    style: TextStyle(color: Colors.blue, fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                ]),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 10),
              child: RichText(
                text: TextSpan(children: [
                  TextSpan(
                    text: "Albumin Base Excess : ",
                    style: TextStyle(color: Colors.black, fontSize: 18, fontWeight: FontWeight.w400),
                  ),
                  TextSpan(
                    text: "${widget.albuminbaseExcess}",
                    style: TextStyle(color: Colors.blue, fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                ]),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 10),
              child: RichText(
                text: TextSpan(children: [
                  TextSpan(
                    text: "Lactate Base Excess : ",
                    style: TextStyle(color: Colors.black, fontSize: 18, fontWeight: FontWeight.w400),
                  ),
                  TextSpan(
                    text: "${widget.lactatebaseExcess}",
                    style: TextStyle(color: Colors.blue, fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                ]),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 10),
              child: RichText(
                text: TextSpan(children: [
                  TextSpan(
                    text: "Other Ions Base Excess : ",
                    style: TextStyle(color: Colors.black, fontSize: 18, fontWeight: FontWeight.w400),
                  ),
                  TextSpan(
                    text: "${widget.otherionsbaseExess}",
                    style: TextStyle(color: Colors.blue, fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                ]),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 15),
              child: Image.asset("assets/images/report.png"),
            )
          ],
        ),
      ),
    );
  }
}
