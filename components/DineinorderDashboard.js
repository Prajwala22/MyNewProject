import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View ,Image} from "react-native";
import { DataTable } from 'react-native-paper';
import styles from '../assets/css/style';
import Colors from '../screens/constants/colors';


export default function TableViewDineinorderDashboard({ data, sendEditData, ...props }) {

    const numberOfItemsPerPageList = [5, 10, 15];
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




    const tableRow = (taxData) => (
        <View style={[styles.tableRow, { borderColor: showView && showViewId == taxData.orderId ? '#407C6A' : '#F5F3F6' }]} >
            <DataTable.Row style={styles.datatableextraline} key={taxData.orderItemsStatus}>
                <DataTable.Cell style={[styles.flexSl]}><Text style={styles.tableCell}>{count++}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{taxData.tableName}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{taxData.itemscount}</Text></DataTable.Cell>
                <DataTable.Cell><Text style={styles.tableCell}>{taxData.subTotal}</Text></DataTable.Cell>
                <DataTable.Cell>
                    {taxData.orderStatus == 'Running' ? <View style={[styles.runningStatus]}><Text style={[styles.font12, styles.fontBold, styles.redText]}>{taxData.orderStatus}</Text></View> : ''}
                    {taxData.orderStatus == 'Prepared' ? <View style={[styles.runningStatus, styles.Prepared]}><Text style={[styles.font12, styles.fontBold, styles.preText]}>{taxData.orderStatus}</Text></View> : ''}
                    {taxData.orderStatus == 'Completed' ? <View style={[styles.runningStatus, styles.ComplStatus]}><Text style={[styles.font12, styles.fontBold, styles.TextGreen]}>{taxData.orderStatus}</Text></View> : ''}
                </DataTable.Cell>
                <DataTable.Cell style={[styles.flexSl, styles.textCenter, styles.justifyCenter]}>
                    <View style={styles.tableButton}>
                        {
                            showViewId != taxData.orderId ?
                                <TouchableOpacity onPress={() => {
                                    setShowView(true)
                                    setShowViewId(taxData.orderId)
                                }
                                }>
                                    <Ionicons name="eye-outline" color={Colors.labelColor} size={20} style={styles.viewIcon} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => {
                                    setShowView(false)
                                    setShowViewId('')
                                }
                                }>
                                    <Ionicons name="eye-off-outline" color={Colors.labelColor} size={20} style={styles.viewIcon} />
                                </TouchableOpacity>
                        }
                    </View>
                </DataTable.Cell>
            </DataTable.Row>
            {
                showView && showViewId == taxData.orderId &&
                <View style={styles.viewCon}>
                    <View style={[styles.tableViewBorder]}>
                        <View style={styles.ViewConBlk}>
                            <View style={[styles.viewCatView]}>
                                <Text style={styles.catName}>Order Number :</Text>
                                <Text style={styles.catValue}> {taxData.orderNo}</Text>
                            </View>
                            <View style={styles.viewCatView}>
                                <Text style={styles.catName}>Order Status :</Text>
                                <Text style={styles.catValue}> {taxData.orderStatus}</Text>
                            </View>
                            <View style={[styles.ViewConBlk, styles.viewTable]}>
                                <DataTable.Header style={styles.viewTableHead}>
                                    <DataTable.Title><Text style={styles.catName}>Item Name  </Text></DataTable.Title>
                                    <DataTable.Title><Text style={styles.catName}>Quantity  </Text></DataTable.Title>
                                    <DataTable.Title> <Text style={styles.catName}>Amount  </Text></DataTable.Title>
                                </DataTable.Header>

                                {taxData.length !== 0 &&
                                    taxData?.items?.map((orderitem, index) => (
                                        <DataTable.Row style={styles.viewTableHead}>
                                            <DataTable.Cell><Text style={styles.catValue}>{orderitem.itemName}</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={styles.catValue}>{orderitem.orderQuantity}</Text></DataTable.Cell>
                                            <DataTable.Cell><Text style={styles.catValue}>{orderitem.itemAmount}</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    ))}

                                {/* <DataTable.Row style={styles.viewTableHead}>
                                    <DataTable.Cell></DataTable.Cell>
                                    <DataTable.Cell><Text style={[styles.catValue, styles.fontBold]}>Sub Total</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={[styles.catValue, styles.fontBold]}>{taxData.subTotal}</Text></DataTable.Cell>
                                </DataTable.Row> */}

                            </View>
                            {/* <View style={styles.ViewConBlk}>
                                <View style={styles.viewCatView}>
                                    <Text style={styles.catName}></Text>
                                    <Text style={styles.catValue}>{taxData.subTotal}</Text>
                                </View>
                            </View> */}
                        </View>
                    </View>
                </View>
            }
        </View>
    );

    return (
<>
{
    data.length > 0 ?
    
        <DataTable {...props}>
            <DataTable.Header style={[styles.headerStyle]}>
                <DataTable.Title style={[styles.flexSl]}><Text style={styles.tableHeader}>Sl .No</Text> </DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Table Name</Text> </DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Items Count</Text></DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Sub Total</Text></DataTable.Title>
                <DataTable.Title><Text style={styles.tableHeader}>Status</Text></DataTable.Title>
                <DataTable.Title style={[styles.flexSl, styles.textCenter]}><Text style={[styles.tableHeader, styles.textCenter]}>Action</Text>
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
        :
        <View style={styles.noRecordFoundView}>
        <Image
            style={styles.noRecordImage}
            source={(require('../assets/images/clipboard.png'))}
        />
        <View>
            <Text style={styles.recordDisplay}>There are no orders to display.</Text>
        </View>
    </View>
    }
        </>
    );
}