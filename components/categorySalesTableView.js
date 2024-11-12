import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from "react-native";
import { DataTable } from 'react-native-paper';
import styles from '../assets/css/style';

export default function SalesByCategoriesTableView({ data, updateDelete, sendEditData, ...props }) {
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
  
      const tableRow = (salesCategoryListData) => (
        <View style={[styles.tableRow, { borderColor: '#F5F3F6' }]}>
          <DataTable.Row style={styles.datatableextraline}>
            <DataTable.Cell><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.tableCell}>{salesCategoryListData.categoryName}</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.tableCell}>{salesCategoryListData.quantity}</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.tableCell}>{salesCategoryListData.orderType}</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.tableCell}>{salesCategoryListData.amount}</Text></DataTable.Cell>
          </DataTable.Row>    
        </View>
      );
        // --------------------------------------------------- User Interface ------------------------------------------

      return (

        <DataTable {...props}>
          <DataTable.Header style={[styles.headerStyle]}>
            <DataTable.Title><Text style={styles.tableHeader}>Sl.No</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Category Name</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Quantity Sold</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Order Type</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHeader}>Amount</Text>
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
      );
}