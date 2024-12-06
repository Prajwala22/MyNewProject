import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from "react-native";
import { DataTable } from 'react-native-paper';
import styles from '../assets/css/style';

// Updated component with default parameters for props
export default function SalesByCategoriesTableView({
  data = [], 
  updateDelete = () => {}, 
  sendEditData = () => {}, 
  ...props 
}) {
  const numberOfItemsPerPageList = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [showView, setShowView] = useState(false);
  const [showViewId, setShowViewId] = useState('');
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
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

  const resetDefaultValue = () => {
    setPage(0);
    setShowView(false);
    setShowViewId('');
  }

  const tableRow = (salesCategoryListData, index) => (
    <View key={salesCategoryListData.categoryId || index} style={[styles.tableRow, { borderColor: '#F5F3F6' }]}>
      <DataTable.Row style={styles.datatableextraline}>
        <DataTable.Cell><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{salesCategoryListData.categoryName}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{salesCategoryListData.quantity}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{salesCategoryListData.orderType}</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.tableCell}>{salesCategoryListData.amount}</Text></DataTable.Cell>
      </DataTable.Row>    
    </View>
  );

  return (
    <DataTable {...props}>
      <DataTable.Header style={[styles.headerStyle]}>
        <DataTable.Title><Text style={styles.tableHeader}>Sl.No</Text></DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeader}>Category Name</Text></DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeader}>Quantity Sold</Text></DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeader}>Order Type</Text></DataTable.Title>
        <DataTable.Title><Text style={styles.tableHeader}>Amount</Text></DataTable.Title>
      </DataTable.Header>

      <ScrollView>
  {Array.isArray(data) && data.length > 0 ? (
    data
      .slice(page * numberOfItemsPerPage, page * numberOfItemsPerPage + numberOfItemsPerPage)
      .map((row, index) => tableRow(row, index))
  ) : (
   null  // Display a message if no data is available
  )}
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
