import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatMonthsArr } from "../utli.js";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
  },
  header: {
    margin: 15,
    padding: 15,
  },
  section: {
    margin: 15,
    padding: 15,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    width: "50%",
  },
  tableCell: {
    borderBottom: 1,
    paddingTop: 12,
    paddingLeft: 5,
  },
  tableCellNoBorder: {
    paddingTop: 12,
    paddingRight: 7,
    textAlign: "right",
  },
});

// Create Document Component
const MyDocument = (props) => {
    return (
      <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.header}>
                <Text>Invoice</Text>
                <Text>{props.data.yourName}</Text>
                <Text>{props.data.yourEmail}</Text>
                <Text>{props.data.yourNumber}</Text>
              </View>
  
              <View style={styles.section}>
                <View style={styles.row}>
                  <View style={styles.col}>
                    <Text>Bill To:</Text>
                    <Text>{props.data.parentName}</Text>
                    <Text>{props.data.parentEmail}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text>For</Text>
                    <Text>{props.data.studentName}'s {formatMonthsArr(props.data.months)}</Text>
                    <Text>Private Lessons</Text>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.row}>
                  <View style={styles.col}>
                    <Text>Private Lessons (Dates)</Text>
                    {props.data.lessons.map((lesson, index) => {
                      return (
                        <Text style={styles.tableCell} key={`lesson-${index}`}>
                          {lesson.date}
                        </Text>
                      );
                    })}
                    <Text style={styles.tableCellNoBorder}>Total</Text>
                  </View>
                  <View style={styles.col}>
                    <Text>Amount</Text>
                    {props.data.lessons.map((lesson, index) => {
                      return (
                        <Text style={styles.tableCell} key={`amount-${index}`}>
                          ${lesson.cost}
                        </Text>
                      );
                    })}
                    <Text style={styles.tableCell}>${props.data.total}</Text>
                  </View>
                </View>
              </View>
  
              <View style={styles.section}>
                <Text>Thank You!</Text>
              </View>
            </Page>
          </Document>
    ) 
}

export default MyDocument;