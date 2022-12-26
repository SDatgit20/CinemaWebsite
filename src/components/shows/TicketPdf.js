import React from 'react';
import { Page, StyleSheet, Document, Text, View } from "@react-pdf/renderer";
import BookingConfirmation from './BookingConfirmation';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    image: {
        height: 200,
        width: 150
    },
});

const TicketPdf = (props) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text color='black'>Hello {props.details.audienceName}</Text>
                </View>
            </Page>
        </Document>
    )
}

export default TicketPdf;