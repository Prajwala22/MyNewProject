import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View,Image } from "react-native";
import { DataTable } from 'react-native-paper';
import styles from '../assets/css/style';


export default function DineInSales({ data, updateDelete, sendEditData, ...props }) {
    // const numberOfItemsPerPageList = [5, 10, 15];
    //Changes From Prajwala on 30-06-2023
    const [numberOfItemsPerPageList, setNumberOfItemsPerPageList] = useState([]);
    useEffect(() => {
      const generateNumberOfItemsPerPageList = () => {
        const newList = [5, 10, 15]; // Only include 5, 10, and 15 in the list
        setNumberOfItemsPerPageList(newList);
      };
    
      generateNumberOfItemsPerPageList();
    }, [data]);
  
    useEffect(() => {
      if (!numberOfItemsPerPageList.includes(numberOfItemsPerPage)) {
       onItemsPerPageChange(numberOfItemsPerPageList[0]);
      }
    }, [numberOfItemsPerPageList]);
    //Changes From Prajwala on 30-06-2023
    
    const [page, setPage] = useState(0);
    const [showView, setShowView] = useState(false);
    const [showViewId, setShowViewId] = useState('');
  
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
      numberOfItemsPerPageList[0]
    );
    const from = page * numberOfItemsPerPage;
    var count = from + 1;
  
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);
    const navigation = useNavigation();
  
    useEffect(() => {
      setPage(0);
      const unsubscribe = navigation.addListener('focus', () => {
        resetDefaultValue();
      });
      return unsubscribe;
  
    }, [numberOfItemsPerPage]);
  
    const resetDefaultValue =
      () => {
        setPage(0);
        setShowView(false);
        setShowViewId('')
      }
  
      const tableRow = (dineInSalesData) => (
        <View style={[styles.tableRow, { borderColor: '#F5F3F6' }]}>
          <DataTable.Row style={styles.datatableextraline}>
            <DataTable.Cell><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
            {/* <DataTable.Cell><Text style={styles.tableCell}>{dineInSalesData.customerName}</Text></DataTable.Cell> */}
            <DataTable.Cell><Text style={styles.tableCell}>{dineInSalesData.orderNo}</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.tableCell}>{dineInSalesData.subTotal.toFixed(2)}</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.tableCell}>{dineInSalesData.orderStatus}</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.tableCell}>{moment(dineInSalesData.createdOn).format('YYYY-MM-DD H:mm')}</Text></DataTable.Cell>
          </DataTable.Row>    
        </View>
      );
        // --------------------------------------------------- User Interface ------------------------------------------

      return (
               <>
                 {data.length === 0 ?
              <View style={styles.noRecordFoundView}>
                    <Image
                      style={styles.noRecordImage}
                      source={(require('../assets/images/clipboard.png'))}
                    />
                    <View>
                      <Text style={styles.recordDisplay}>There are no Orders to display.</Text>
                    </View>
                  </View>
                    :
        <DataTable {...props}>
          <DataTable.Header style={[styles.headerStyle]}>
            <DataTable.Title><Text style={styles.tableHeader}>Sl.No</Text></DataTable.Title>
            {/* <DataTable.Title><Text style={styles.tableHeader}>Customer Name</Text></DataTable.Title> */}
            <DataTable.Title><Text style={styles.tableHeader}>Order Number</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Amount</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Status</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Ordered Date</Text>
            </DataTable.Title>
          </DataTable.Header>
          <ScrollView >
    
    
            {data
              .slice(
                page * numberOfItemsPerPage,
                page * numberOfItemsPerPage + numberOfItemsPerPage
              )
              .map((row) => tableRow(row))}
    
    
          </ScrollView>
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(data.length / numberOfItemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${data.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            selectPageDropdownLabel={'Rows per page'}
          />
    
        </DataTable>
      }
      </>
      );
}