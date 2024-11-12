import { Image, View, ScrollView, Text, FlatList, SectionList, Toast, Dimensions, TouchableOpacity } from 'react-native';
import { default as styles, default as styless } from '../../assets/css/style';
import { floorPlanningImages } from '../common/FloorPlanningConstants';
import { GestureDetector, PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, Value, event,
    cond, eq, add, set, useCode, block, clamp
} from 'react-native-reanimated';

const DraggableTable = ({ item, floorPlanningImages, dragTable, onMoveTable }) => {
    const translateXtemp = new Animated.Value(item.x);
    const translateX = translateXtemp._value
    const translateYtemp = new Animated.Value(item.y);
    const translateY = translateYtemp._value
    

    const boundaryRect = {
        left: 0,
        top: 0,
        right: 300, // Adjust these values according to your layout
        bottom: 500, // Adjust these values according to your layout
    };
    // const minX = 0; // Minimum x-coordinate (left boundary)
    // const minY = 0; // Minimum y-coordinate (top boundary)
    // const maxX = 300; // Maximum x-coordinate (right boundary)
    // const maxY = 500; // Maximum y-coordinate (bottom boundary)
    const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Set the boundaries dynamically based on screen dimensions
// const minX = 0; // Minimum x-coordinate (left boundary)
// const minY = 0; // Minimum y-coordinate (top boundary)
// const maxX = screenWidth - 130; // Maximum x-coordinate (right boundary)
// const maxY = screenHeight - 80; // Maximum y-coordinate (bottom boundary)
  
//     const onGestureEvent = useAnimatedGestureHandler({
//       onStart: (_, ctx) => {
//         ctx.startX = translateX.value;
//         ctx.startY = translateY.value;
//       },
//       onActive: (event, ctx) => {
//         const newX = ctx.startX + event.translationX;
//         const newY = ctx.startY + event.translationY;
  
//         // Apply boundaries using clamp
//         translateX.value = Math.min(Math.max(newX, minX), maxX);
//         translateY.value = Math.min(Math.max(newY, minY), maxY);
//       },
//       onEnd: () => {
//         // You can save the updated x and y coordinates here if needed
//       },
//     });
    // const translateX = new Value(item.y);
    // const translateY = new Value(item.x);

    // const translateXt = useSharedValue(item.x);
    // const translateYt = useSharedValue(item.y);

    // const onGestureEvent = useAnimatedGestureHandler({
    //     onStart: (_, ctx) => {
    //         ctx.startX = translateX.value;
    //         ctx.startY = translateY.value;
    //     },
    //     onActive: (event, ctx) => {
    //         translateX.value = ctx.startX + event.translationX;
    //         translateY.value = ctx.startY + event.translationY;
    //     },
    //     onEnd: () => {
    //         const updatedX = item.x + translateX.value;
    //         const updatedY = item.y + translateY.value;
    //         onMoveTable(updatedX, updatedY, item.tableId);

    //         // Reset translateX and translateY for the next gesture
    //         translateX.value = 0;
    //         translateY.value = 0;
    //     },
    // });
    

    // const animatedStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [
    //             { translateX: translateX.value },
    //             { translateY: translateY.value },
    //         ],
    //     };
    // });

    const onGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX, // Use item's x coordinate
                    translationY: translateY, // Use item's y coordinate
                },
            },
        ],
        { useNativeDriver: true },
    );

    return (
        <View style={{ position: 'relative' }}>
            {item?.tableDesign === "Square" && item?.tableStatus === "Empty" && item?.capacity === 1 ?
                <GestureHandlerRootView>
                    <PanGestureHandler
                        enabled={dragTable}
                        onGestureEvent={onGestureEvent}
                        onHandlerStateChange={event => {
                            if (event.nativeEvent.state === State.END) {
                                const updatedX = item.x + event.nativeEvent.translationX;
                                const updatedY = item.y + event.nativeEvent.translationY;
                                onMoveTable(updatedX, updatedY, item.tableId);
                            }
                        }}
                    >
                        <Animated.View style={[{
                            transform: [{ translateX: translateX }, { translateY: translateY }],
                            position: 'absolute',
                        }]}>
                            <View style={[{ width: 130, height: 80 }]}>
                                <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>
                                    <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                    <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                </View>
                                {floorPlanningImages['SquareTableE1']}
                            </View>
                        </Animated.View>
                    </PanGestureHandler>
                </GestureHandlerRootView>
                :
                item?.tableDesign === "Square" && item?.tableStatus === "Empty" && item?.capacity === 2 ?
                    <GestureHandlerRootView>
                        <PanGestureHandler
                            enabled={dragTable}
                            onGestureEvent={onGestureEvent}
                            onHandlerStateChange={event => {
                                if (event.nativeEvent.state === State.END) {
                                    const updatedX = item.x + event.nativeEvent.translationX;
                                    const updatedY = item.y + event.nativeEvent.translationY;
                                    onMoveTable(updatedX, updatedY, item.tableId);

                                }
                            }}
                        >
                            <Animated.View style={[{
                                transform: [{ translateX: translateX }, { translateY: translateY }],
                                position: 'absolute',
                            }]}>
                                <View style={[{ width: 130, height: 80 }]}>
                                    <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                        <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                        <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                    </View>
                                    {floorPlanningImages['SquareTableE2']}
                                </View>
                            </Animated.View>
                        </PanGestureHandler>
                    </GestureHandlerRootView>
                    :
                    item?.tableDesign === "Square" && item?.tableStatus === "Empty" && item?.capacity === 3 ?
                        <GestureHandlerRootView>
                            <PanGestureHandler
                                enabled={dragTable}
                                onGestureEvent={onGestureEvent}
                                onHandlerStateChange={event => {
                                    if (event.nativeEvent.state === State.END) {
                                        const updatedX = item.x + event.nativeEvent.translationX;
                                        const updatedY = item.y + event.nativeEvent.translationY;
                                        onMoveTable(updatedX, updatedY, item.tableId);
                                    }
                                }}
                            >
                                <Animated.View style={[{
                                    transform: [{ translateX: translateX }, { translateY: translateY }],
                                    position: 'absolute',
                                }]}>
                                    <View style={[{ width: 130, height: 80 }]}>
                                        <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                            <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                            <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                        </View>
                                        {floorPlanningImages['SquareTableE3']}
                                        {/* <Image
                                        source={require('../../assets/images/logo.png')}
                                        style={{ width: 100, height: 100 }}
                                    /> */}
                                    </View>
                                </Animated.View>
                            </PanGestureHandler>
                        </GestureHandlerRootView> :
                        item?.tableDesign === "Square" && item?.tableStatus === "Empty" && item?.capacity === 4 ?
                            <GestureHandlerRootView>
                                <PanGestureHandler
                                    enabled={dragTable}
                                    onGestureEvent={onGestureEvent}
                                    onHandlerStateChange={event => {
                                        if (event.nativeEvent.state === State.END) {
                                            const updatedX = item.x + event.nativeEvent.translationX;
                                            const updatedY = item.y + event.nativeEvent.translationY;
                                            onMoveTable(updatedX, updatedY, item.tableId);
                                        }
                                    }}>
                                    <Animated.View style={[{
                                        transform: [{ translateX: translateX }, { translateY: translateY }],
                                        position: 'absolute',
                                    }]}>
                                        <View style={[{ width: 130, height: 80 }]}>
                                            <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                            </View>
                                            {floorPlanningImages['SquareTableE4']}
                                        </View>
                                    </Animated.View>
                                </PanGestureHandler>
                            </GestureHandlerRootView> :
                            item?.tableDesign === "Square" && item?.tableStatus === "Empty" && item?.capacity === 5 ?
                                <GestureHandlerRootView>
                                    <PanGestureHandler
                                        enabled={dragTable}
                                        onGestureEvent={onGestureEvent}
                                        onHandlerStateChange={event => {
                                            if (event.nativeEvent.state === State.END) {
                                                const updatedX = item.x + event.nativeEvent.translationX;
                                                const updatedY = item.y + event.nativeEvent.translationY;
                                                onMoveTable(updatedX, updatedY, item.tableId);
                                            }
                                        }}>
                                        <Animated.View style={[{
                                            transform: [{ translateX: translateX }, { translateY: translateY }],
                                            position: 'absolute',
                                        }]}>
                                            <View style={[{ width: 130, height: 80 }]}>
                                                <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                    <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                    <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                </View>
                                                {floorPlanningImages['SquareTableE5']}
                                            </View>
                                        </Animated.View>
                                    </PanGestureHandler>
                                </GestureHandlerRootView> :
                                item?.tableDesign === "Square" && item?.tableStatus === "Empty" && item?.capacity === 6 ?
                                    <GestureHandlerRootView>
                                        <PanGestureHandler enabled={dragTable}
                                            onGestureEvent={onGestureEvent}
                                            onHandlerStateChange={event => {
                                                if (event.nativeEvent.state === State.END) {
                                                    const updatedX = item.x + event.nativeEvent.translationX;
                                                    const updatedY = item.y + event.nativeEvent.translationY;
                                                    onMoveTable(updatedX, updatedY, item.tableId);
                                                }
                                            }}>
                                            <Animated.View style={[{
                                                transform: [{ translateX: translateX }, { translateY: translateY }],
                                                position: 'absolute',
                                            }]}>
                                                <View style={[{ width: 130, height: 80 }]}>
                                                    <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                        <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                        <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                    </View>
                                                    {floorPlanningImages['SquareTableE6']}
                                                </View>
                                            </Animated.View>
                                        </PanGestureHandler>
                                    </GestureHandlerRootView> :
                                    item?.tableDesign === "Square" && item.tableStatus === "Occupied" && item.capacity === 1 ?
                                        <GestureHandlerRootView>
                                            <PanGestureHandler enabled={dragTable}
                                                onGestureEvent={onGestureEvent}
                                                onHandlerStateChange={event => {
                                                    if (event.nativeEvent.state === State.END) {
                                                        const updatedX = item.x + event.nativeEvent.translationX;
                                                        const updatedY = item.y + event.nativeEvent.translationY;
                                                        onMoveTable(updatedX, updatedY, item.tableId);
                                                    }
                                                }}>
                                                <Animated.View style={[{
                                                    transform: [{ translateX: translateX }, { translateY: translateY }],
                                                    position: 'absolute',
                                                }]}>
                                                    <View style={[{ width: 130, height: 80 }]}>
                                                        <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                            <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                            <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                        </View>
                                                        {floorPlanningImages['SquareTableO1']}
                                                    </View>
                                                </Animated.View>
                                            </PanGestureHandler>
                                        </GestureHandlerRootView> :
                                        item.tableDesign === "Square" && item.tableStatus === "Occupied" && item.capacity === 2 ?
                                            <GestureHandlerRootView>
                                                <PanGestureHandler enabled={dragTable}
                                                    // onGestureEvent={onGestureEvent}
                                                    onHandlerStateChange={event => {
                                                        if (event.nativeEvent.state === State.END) {
                                                            const updatedX = item.x + event.nativeEvent.translationX;
                                                            const updatedY = item.y + event.nativeEvent.translationY;
                                                            onMoveTable(updatedX, updatedY, item.tableId);
                                                        }
                                                    }}>
                                                    <Animated.View style={[{
                                                        transform: [{ translateX: translateX }, { translateY: translateY }],
                                                        position: 'absolute',
                                                    }]}>
                                                        <View style={[{ width: 130, height: 80 }]}>
                                                            <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                            </View>
                                                            {floorPlanningImages['SquareTableO2']}
                                                        </View>
                                                    </Animated.View>
                                                </PanGestureHandler>
                                            </GestureHandlerRootView> :
                                            item.tableDesign === "Square" && item.tableStatus === "Occupied" && item.capacity === 3 ?
                                                <GestureHandlerRootView>
                                                    <PanGestureHandler enabled={dragTable}
                                                        onGestureEvent={onGestureEvent}
                                                        onHandlerStateChange={event => {
                                                            if (event.nativeEvent.state === State.END) {
                                                                const updatedX = item.x + event.nativeEvent.translationX;
                                                                const updatedY = item.y + event.nativeEvent.translationY;
                                                                onMoveTable(updatedX, updatedY, item.tableId);
                                                            }
                                                        }}>
                                                        <Animated.View style={[{
                                                            transform: [{ translateX: translateX }, { translateY: translateY }],
                                                            position: 'absolute',
                                                        }]}>
                                                            <View style={[{ width: 130, height: 80 }]}>
                                                                <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                    <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                    <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                </View>
                                                                {floorPlanningImages['SquareTableO3']}
                                                            </View>
                                                        </Animated.View>
                                                    </PanGestureHandler>
                                                </GestureHandlerRootView> :
                                                item.tableDesign === "Square" && item.tableStatus === "Occupied" && item.capacity === 4 ?
                                                    <GestureHandlerRootView>
                                                        <PanGestureHandler enabled={dragTable}
                                                            // onGestureEvent={onGestureEvent}
                                                            onHandlerStateChange={event => {
                                                                if (event.nativeEvent.state === State.END) {
                                                                    const updatedX = item.x + event.nativeEvent.translationX;
                                                                    const updatedY = item.y + event.nativeEvent.translationY;
                                                                    onMoveTable(updatedX, updatedY, item.tableId);
                                                                }
                                                            }}>
                                                            <Animated.View style={[{
                                                                transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                position: 'absolute',
                                                            }]}>
                                                                <View style={[{ width: 130, height: 80 }]}>
                                                                    <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                        <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                        <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                    </View>
                                                                    {floorPlanningImages['SquareTableO4']}
                                                                </View>
                                                            </Animated.View>
                                                        </PanGestureHandler>
                                                    </GestureHandlerRootView> :
                                                    item.tableDesign === "Square" && item.tableStatus === "Occupied" && item.capacity === 5 ?
                                                        <GestureHandlerRootView>
                                                            <PanGestureHandler enabled={dragTable}
                                                                onGestureEvent={onGestureEvent}
                                                                onHandlerStateChange={event => {
                                                                    if (event.nativeEvent.state === State.END) {
                                                                        const updatedX = item.x + event.nativeEvent.translationX;
                                                                        const updatedY = item.y + event.nativeEvent.translationY;
                                                                        onMoveTable(updatedX, updatedY, item.tableId);
                                                                    }
                                                                }}>
                                                                <Animated.View style={[{
                                                                    transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                    position: 'absolute',
                                                                }]}>
                                                                    <View style={[{ width: 130, height: 80 }]}>
                                                                        <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                            <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                            <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                        </View>
                                                                        {floorPlanningImages['SquareTableO5']}
                                                                    </View>
                                                                </Animated.View>
                                                            </PanGestureHandler>
                                                        </GestureHandlerRootView> :
                                                        item.tableDesign === "Square" && item.tableStatus === "Occupied" && item.capacity === 6 ?
                                                            <GestureHandlerRootView>
                                                                <PanGestureHandler enabled={dragTable}
                                                                    onGestureEvent={onGestureEvent}
                                                                    onHandlerStateChange={event => {
                                                                        if (event.nativeEvent.state === State.END) {
                                                                            const updatedX = item.x + event.nativeEvent.translationX;
                                                                            const updatedY = item.y + event.nativeEvent.translationY;
                                                                            onMoveTable(updatedX, updatedY, item.tableId);
                                                                        }
                                                                    }}>
                                                                    <Animated.View style={[{
                                                                        transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                        position: 'absolute',
                                                                    }]}>
                                                                        <View style={[{ width: 130, height: 80 }]}>
                                                                            <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                            </View>
                                                                            {floorPlanningImages['SquareTableO6']}
                                                                        </View>
                                                                    </Animated.View>
                                                                </PanGestureHandler>
                                                            </GestureHandlerRootView> :
                                                            item?.tableDesign === "Triangle" && item.tableStatus === "Empty" && item.capacity === 1 ?
                                                                <GestureHandlerRootView>
                                                                    <PanGestureHandler
                                                                        enabled={dragTable}
                                                                        onGestureEvent={onGestureEvent}
                                                                        onHandlerStateChange={event => {
                                                                            if (event.nativeEvent.state === State.END) {
                                                                                const updatedX = item.x + event.nativeEvent.translationX;
                                                                                const updatedY = item.y + event.nativeEvent.translationY;
                                                                                onMoveTable(updatedX, updatedY, item.tableId);
                                                                            }
                                                                        }}>
                                                                        <Animated.View style={[{
                                                                            transform: [{ translateX: translateX }, { translateY: translateX }],
                                                                            position: 'absolute',
                                                                        }]}>
                                                                            <View style={[{ width: 130, height: 80 }]}>
                                                                                <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                    <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                    <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                </View>
                                                                                {floorPlanningImages['TriangleTableE1']}
                                                                            </View>
                                                                        </Animated.View>
                                                                    </PanGestureHandler>
                                                                 </GestureHandlerRootView> 
                                                                :
                                                                item.tableDesign === "Triangle" && item.tableStatus === "Empty" && item.capacity === 2 ?
                                                                    <GestureHandlerRootView>
                                                                        <PanGestureHandler enabled={dragTable}
                                                                            onGestureEvent={onGestureEvent}
                                                                            onHandlerStateChange={event => {
                                                                                if (event.nativeEvent.state === State.END) {
                                                                                    const updatedX = item.x + event.nativeEvent.translationX;
                                                                                    const updatedY = item.y + event.nativeEvent.translationY;
                                                                                    onMoveTable(updatedX, updatedY, item.tableId);
                                                                                }
                                                                            }}>
                                                                            <Animated.View style={[{
                                                                                transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                position: 'absolute',
                                                                            }]}>
                                                                                <View style={[{ width: 130, height: 80 }]}>
                                                                                    <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                        <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                        <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                    </View>
                                                                                    {floorPlanningImages['TriangleTableE2']}
                                                                                </View>
                                                                            </Animated.View>
                                                                        </PanGestureHandler>
                                                                    </GestureHandlerRootView> :
                                                                    item.tableDesign === "Triangle" && item.tableStatus === "Empty" && item.capacity === 3 ?
                                                                        <GestureHandlerRootView>
                                                                            <PanGestureHandler enabled={dragTable}
                                                                                onGestureEvent={onGestureEvent}
                                                                                onHandlerStateChange={event => {
                                                                                    if (event.nativeEvent.state === State.END) {
                                                                                        const updatedX = item.x + event.nativeEvent.translationX;
                                                                                        const updatedY = item.y + event.nativeEvent.translationY;
                                                                                        onMoveTable(updatedX, updatedY, item.tableId);
                                                                                    }
                                                                                }}>
                                                                                <Animated.View style={[{
                                                                                    transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                    position: 'absolute',
                                                                                }]}>
                                                                                    <View style={[{ width: 130, height: 80 }]}>
                                                                                        <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                            <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                            <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                        </View>
                                                                                        {floorPlanningImages['TriangleTableE3']}
                                                                                    </View>
                                                                                </Animated.View>
                                                                            </PanGestureHandler>
                                                                        </GestureHandlerRootView> :
                                                                        item.tableDesign === "Triangle" && item.tableStatus === "Empty" && item.capacity === 4 ?
                                                                            <GestureHandlerRootView>
                                                                                <PanGestureHandler enabled={dragTable}
                                                                                    onGestureEvent={onGestureEvent}
                                                                                    onHandlerStateChange={event => {
                                                                                        if (event.nativeEvent.state === State.END) {
                                                                                            const updatedX = item.x + event.nativeEvent.translationX;
                                                                                            const updatedY = item.y + event.nativeEvent.translationY;
                                                                                            onMoveTable(updatedX, updatedY, item.tableId);
                                                                                        }
                                                                                    }}>
                                                                                    <Animated.View style={[{
                                                                                        transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                        position: 'absolute',
                                                                                    }]}>
                                                                                        <View style={[{ width: 130, height: 80 }]}>
                                                                                            <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                            </View>
                                                                                            {floorPlanningImages['TriangleTableE4']}
                                                                                        </View>
                                                                                    </Animated.View>
                                                                                </PanGestureHandler>
                                                                            </GestureHandlerRootView> :
                                                                            item.tableDesign === "Triangle" && item.tableStatus === "Empty" && item.capacity === 5 ?
                                                                                <GestureHandlerRootView>
                                                                                    <PanGestureHandler enabled={dragTable}
                                                                                        onGestureEvent={onGestureEvent}
                                                                                        onHandlerStateChange={event => {
                                                                                            if (event.nativeEvent.state === State.END) {
                                                                                                const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                onMoveTable(updatedX, updatedY, item.tableId);
                                                                                            }
                                                                                        }}>
                                                                                        <Animated.View style={[{
                                                                                            transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                            position: 'absolute',
                                                                                        }]}>
                                                                                            <View style={[{ width: 130, height: 80 }]}>
                                                                                                <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                    <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                    <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                </View>
                                                                                                {floorPlanningImages['TriangleTableE5']}
                                                                                            </View>
                                                                                        </Animated.View>
                                                                                    </PanGestureHandler>
                                                                                </GestureHandlerRootView> :
                                                                                item.tableDesign === "Triangle" && item.tableStatus === "Empty" && item.capacity === 6 ?
                                                                                    <GestureHandlerRootView>
                                                                                        <PanGestureHandler enabled={dragTable}
                                                                                            onGestureEvent={onGestureEvent}
                                                                                            onHandlerStateChange={event => {
                                                                                                if (event.nativeEvent.state === State.END) {
                                                                                                    const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                    const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                    onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                }
                                                                                            }}>
                                                                                            <Animated.View style={[{
                                                                                                transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                position: 'absolute',
                                                                                            }]}>
                                                                                                <View style={[{ width: 130, height: 80 }]}>
                                                                                                    <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                        <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                        <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                    </View>
                                                                                                    {floorPlanningImages['TriangleTableE6']}
                                                                                                </View>
                                                                                            </Animated.View>
                                                                                        </PanGestureHandler>
                                                                                    </GestureHandlerRootView> :
                                                                                    item?.tableDesign === "Triangle" && item.tableStatus === "Occupied" && item.capacity === 1 ?
                                                                                        <GestureHandlerRootView>
                                                                                            <PanGestureHandler enabled={dragTable}
                                                                                                onGestureEvent={onGestureEvent}
                                                                                                onHandlerStateChange={event => {
                                                                                                    if (event.nativeEvent.state === State.END) {
                                                                                                        const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                        const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                        onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                    }
                                                                                                }}>
                                                                                                <Animated.View style={[{
                                                                                                    transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                    position: 'absolute',
                                                                                                }]}>
                                                                                                    <View style={[{ width: 130, height: 80 }]}>
                                                                                                        <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                            <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                            <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                        </View>
                                                                                                        {floorPlanningImages['TriangleTableO1']}
                                                                                                    </View>
                                                                                                </Animated.View>
                                                                                            </PanGestureHandler>
                                                                                        </GestureHandlerRootView> :
                                                                                        item.tableDesign === "Triangle" && item.tableStatus === "Occupied" && item.capacity === 2 ?
                                                                                            <GestureHandlerRootView>
                                                                                                <PanGestureHandler enabled={dragTable}
                                                                                                    onGestureEvent={onGestureEvent}
                                                                                                    onHandlerStateChange={event => {
                                                                                                        if (event.nativeEvent.state === State.END) {
                                                                                                            const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                            const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                            onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                        }
                                                                                                    }}>
                                                                                                    <Animated.View style={[{
                                                                                                        transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                        position: 'absolute',
                                                                                                    }]}>
                                                                                                        <View style={[{ width: 130, height: 80 }]}>
                                                                                                            <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                            </View>
                                                                                                            {floorPlanningImages['TriangleTableO2']}
                                                                                                        </View>
                                                                                                    </Animated.View>
                                                                                                </PanGestureHandler>
                                                                                            </GestureHandlerRootView> :
                                                                                            item.tableDesign === "Triangle" && item.tableStatus === "Occupied" && item.capacity === 3 ?
                                                                                                <GestureHandlerRootView>
                                                                                                    <PanGestureHandler enabled={dragTable}
                                                                                                        onGestureEvent={onGestureEvent}
                                                                                                        onHandlerStateChange={event => {
                                                                                                            if (event.nativeEvent.state === State.END) {
                                                                                                                const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                            }
                                                                                                        }}>
                                                                                                        <Animated.View style={[{
                                                                                                            transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                            position: 'absolute',
                                                                                                        }]}>
                                                                                                            <View style={[{ width: 130, height: 80 }]}>
                                                                                                                <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                    <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                    <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                </View>
                                                                                                                {floorPlanningImages['TriangleTableO3']}
                                                                                                            </View>
                                                                                                        </Animated.View>
                                                                                                    </PanGestureHandler>
                                                                                                </GestureHandlerRootView> :
                                                                                                item.tableDesign === "Triangle" && item.tableStatus === "Occupied" && item.capacity === 4 ?
                                                                                                    <GestureHandlerRootView>
                                                                                                        <PanGestureHandler enabled={dragTable}
                                                                                                            onGestureEvent={onGestureEvent}
                                                                                                            onHandlerStateChange={event => {
                                                                                                                if (event.nativeEvent.state === State.END) {
                                                                                                                    const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                    const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                    onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                }
                                                                                                            }}>
                                                                                                            <Animated.View style={[{
                                                                                                                transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                position: 'absolute',
                                                                                                            }]}>
                                                                                                                <View style={[{ width: 130, height: 80 }]}>
                                                                                                                    <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                        <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                        <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                    </View>
                                                                                                                    {floorPlanningImages['TriangleTableO4']}
                                                                                                                </View>
                                                                                                            </Animated.View>
                                                                                                        </PanGestureHandler>
                                                                                                    </GestureHandlerRootView>
                                                                                                    :
                                                                                                    item.tableDesign === "Triangle" && item.tableStatus === "Occupied" && item.capacity === 5 ?
                                                                                                        <GestureHandlerRootView>
                                                                                                            <PanGestureHandler enabled={dragTable}
                                                                                                                onGestureEvent={onGestureEvent}
                                                                                                                onHandlerStateChange={event => {
                                                                                                                    if (event.nativeEvent.state === State.END) {
                                                                                                                        const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                        const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                        onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                    }
                                                                                                                }}>
                                                                                                                <Animated.View style={[{
                                                                                                                    transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                    position: 'absolute',
                                                                                                                }]}>
                                                                                                                    <View style={[{ width: 130, height: 80 }]}>
                                                                                                                        <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                            <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                            <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                        </View>
                                                                                                                        {floorPlanningImages['TriangleTableO5']}
                                                                                                                    </View>
                                                                                                                </Animated.View>
                                                                                                            </PanGestureHandler>
                                                                                                        </GestureHandlerRootView>
                                                                                                        :
                                                                                                        item.tableDesign === "Triangle" && item.tableStatus === "Occupied" && item.capacity === 6 ?
                                                                                                            <GestureHandlerRootView>
                                                                                                                <PanGestureHandler enabled={dragTable}
                                                                                                                    onGestureEvent={onGestureEvent}
                                                                                                                    onHandlerStateChange={event => {
                                                                                                                        if (event.nativeEvent.state === State.END) {
                                                                                                                            const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                            const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                            onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                        }
                                                                                                                    }}>
                                                                                                                    <Animated.View style={[{
                                                                                                                        transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                        position: 'absolute',
                                                                                                                    }]}>
                                                                                                                        <View style={[{ width: 130, height: 80 }]}>
                                                                                                                            <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                            </View>
                                                                                                                            {floorPlanningImages['TriangleTableO6']}
                                                                                                                        </View>
                                                                                                                    </Animated.View>
                                                                                                                </PanGestureHandler>
                                                                                                            </GestureHandlerRootView>
                                                                                                            :
                                                                                                            item?.tableDesign === "Circle" && item.tableStatus === "Empty" && item.capacity === 1 ?
                                                                                                                <GestureHandlerRootView>
                                                                                                                    <PanGestureHandler
                                                                                                                        enabled={dragTable}
                                                                                                                        onGestureEvent={onGestureEvent}
                                                                                                                        onHandlerStateChange={event => {
                                                                                                                            if (event.nativeEvent.state === State.END) {
                                                                                                                                const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                                const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                                onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                            }
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <Animated.View style={[{
                                                                                                                            transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                            position: 'absolute',
                                                                                                                        }]}>
                                                                                                                            <View style={[{ width: 130, height: 80 }]}>
                                                                                                                                <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                    <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                    <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                                </View>
                                                                                                                                {floorPlanningImages['CircleTableE1']}
                                                                                                                            </View>
                                                                                                                        </Animated.View>
                                                                                                                    </PanGestureHandler>
                                                                                                                 </GestureHandlerRootView>

                                                                                                                :
                                                                                                                item.tableDesign === "Circle" && item.tableStatus === "Empty" && item.capacity === 2 ?
                                                                                                                    <GestureHandlerRootView>
                                                                                                                        <PanGestureHandler enabled={dragTable}
                                                                                                                            onGestureEvent={onGestureEvent}
                                                                                                                            onHandlerStateChange={event => {
                                                                                                                                if (event.nativeEvent.state === State.END) {
                                                                                                                                    const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                                    const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                                    onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                                }
                                                                                                                            }}>
                                                                                                                            <Animated.View style={[{
                                                                                                                                transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                                position: 'absolute',
                                                                                                                            }]}>
                                                                                                                                <View style={[{ width: 130, height: 80 }]}>
                                                                                                                                    <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                        <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                        <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                                    </View>
                                                                                                                                    {floorPlanningImages['CircleTableE2']}
                                                                                                                                </View>
                                                                                                                            </Animated.View>
                                                                                                                        </PanGestureHandler>
                                                                                                                    </GestureHandlerRootView>

                                                                                                                    :
                                                                                                                    item.tableDesign === "Circle" && item.tableStatus === "Empty" && item.capacity === 3 ?
                                                                                                                        <GestureHandlerRootView>
                                                                                                                            <PanGestureHandler enabled={dragTable}
                                                                                                                                onGestureEvent={onGestureEvent}
                                                                                                                                onHandlerStateChange={event => {
                                                                                                                                    if (event.nativeEvent.state === State.END) {
                                                                                                                                        const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                                        const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                                        onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                                    }
                                                                                                                                }}>
                                                                                                                                <Animated.View style={[{
                                                                                                                                    transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                                    position: 'absolute',
                                                                                                                                }]}>
                                                                                                                                    <View style={[{ width: 130, height: 80 }]}>
                                                                                                                                        <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                            <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                            <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                                        </View>
                                                                                                                                        {floorPlanningImages['CircleTableE3']}
                                                                                                                                    </View>
                                                                                                                                </Animated.View>
                                                                                                                            </PanGestureHandler>
                                                                                                                        </GestureHandlerRootView>

                                                                                                                        :
                                                                                                                        item.tableDesign === "Circle" && item.tableStatus === "Empty" && item.capacity === 4 ?
                                                                                                                            <GestureHandlerRootView>
                                                                                                                                <PanGestureHandler enabled={dragTable}
                                                                                                                                    onGestureEvent={onGestureEvent}
                                                                                                                                    onHandlerStateChange={event => {
                                                                                                                                        if (event.nativeEvent.state === State.END) {
                                                                                                                                            const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                                            const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                                            onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                                        }
                                                                                                                                    }}>
                                                                                                                                    <Animated.View style={[{
                                                                                                                                        transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                                        position: 'absolute',
                                                                                                                                    }]}>
                                                                                                                                        <View style={[{ width: 130, height: 80 }]}>
                                                                                                                                            <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                                <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                                <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                                            </View>
                                                                                                                                            {floorPlanningImages['CircleTableE4']}
                                                                                                                                        </View>
                                                                                                                                    </Animated.View>
                                                                                                                                </PanGestureHandler>
                                                                                                                            </GestureHandlerRootView>

                                                                                                                            :
                                                                                                                            item.tableDesign === "Circle" && item.tableStatus === "Empty" && item.capacity === 5 ?
                                                                                                                                <GestureHandlerRootView>
                                                                                                                                    <PanGestureHandler enabled={dragTable}
                                                                                                                                        onGestureEvent={onGestureEvent}
                                                                                                                                        onHandlerStateChange={event => {
                                                                                                                                            if (event.nativeEvent.state === State.END) {
                                                                                                                                                const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                                                const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                                                onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                                            }
                                                                                                                                        }}>
                                                                                                                                        <Animated.View style={[{
                                                                                                                                            transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                                            position: 'absolute',
                                                                                                                                        }]}>
                                                                                                                                            <View style={[{ width: 130, height: 80 }]}>
                                                                                                                                                <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                                    <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                                    <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                                                </View>
                                                                                                                                                {floorPlanningImages['CircleTableE5']}
                                                                                                                                            </View>
                                                                                                                                        </Animated.View>
                                                                                                                                    </PanGestureHandler>
                                                                                                                                </GestureHandlerRootView>

                                                                                                                                :
                                                                                                                                item.tableDesign === "Circle" && item.tableStatus === "Empty" && item.capacity === 6 ?
                                                                                                                                    <GestureHandlerRootView>
                                                                                                                                        <PanGestureHandler enabled={dragTable}
                                                                                                                                            onGestureEvent={onGestureEvent}
                                                                                                                                            onHandlerStateChange={event => {
                                                                                                                                                if (event.nativeEvent.state === State.END) {
                                                                                                                                                    const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                                                    const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                                                    onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                                                }
                                                                                                                                            }}>
                                                                                                                                            <Animated.View style={[{
                                                                                                                                                transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                                                position: 'absolute',
                                                                                                                                            }]}>
                                                                                                                                                <View style={[{ width: 130, height: 80 }]}>
                                                                                                                                                    <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                                        <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                                        <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                                                    </View>
                                                                                                                                                    {floorPlanningImages['CircleTableE6']}
                                                                                                                                                </View>
                                                                                                                                            </Animated.View>
                                                                                                                                        </PanGestureHandler>
                                                                                                                                    </GestureHandlerRootView>

                                                                                                                                    :
                                                                                                                                    item?.tableDesign === "Circle" && item.tableStatus === "Occupied" && item.capacity === 1 ?
                                                                                                                                        <GestureHandlerRootView>
                                                                                                                                            <PanGestureHandler enabled={dragTable}
                                                                                                                                                onGestureEvent={onGestureEvent}
                                                                                                                                                onHandlerStateChange={event => {
                                                                                                                                                    if (event.nativeEvent.state === State.END) {
                                                                                                                                                        const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                                                        const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                                                        onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                                                    }
                                                                                                                                                }}>
                                                                                                                                                <Animated.View style={[{
                                                                                                                                                    transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                                                    position: 'absolute',
                                                                                                                                                }]}>
                                                                                                                                                    <View style={[{ width: 130, height: 80 }]}>
                                                                                                                                                        <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                                            <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                                            <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                                                        </View>
                                                                                                                                                        {floorPlanningImages['CircleTableO1']}
                                                                                                                                                    </View>
                                                                                                                                                </Animated.View>
                                                                                                                                            </PanGestureHandler>
                                                                                                                                        </GestureHandlerRootView>

                                                                                                                                        :
                                                                                                                                        item.tableDesign === "Circle" && item.tableStatus === "Occupied" && item.capacity === 2 ?
                                                                                                                                            <GestureHandlerRootView>
                                                                                                                                                <PanGestureHandler enabled={dragTable}
                                                                                                                                                    onGestureEvent={onGestureEvent}
                                                                                                                                                    onHandlerStateChange={event => {
                                                                                                                                                        if (event.nativeEvent.state === State.END) {
                                                                                                                                                            const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                                                            const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                                                            onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                                                        }
                                                                                                                                                    }}>
                                                                                                                                                    <Animated.View style={[{
                                                                                                                                                        transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                                                        position: 'absolute',
                                                                                                                                                    }]}>
                                                                                                                                                        <View style={[{ width: 130, height: 80 }]}>
                                                                                                                                                            <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                                                <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                                                <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                                                            </View>
                                                                                                                                                            {floorPlanningImages['CircleTableO2']}
                                                                                                                                                        </View>
                                                                                                                                                    </Animated.View>
                                                                                                                                                </PanGestureHandler>
                                                                                                                                            </GestureHandlerRootView>

                                                                                                                                            :
                                                                                                                                            item.tableDesign === "Circle" && item.tableStatus === "Occupied" && item.capacity === 3 ?
                                                                                                                                                <GestureHandlerRootView>
                                                                                                                                                    <PanGestureHandler enabled={dragTable}
                                                                                                                                                        onGestureEvent={onGestureEvent}
                                                                                                                                                        onHandlerStateChange={event => {
                                                                                                                                                            if (event.nativeEvent.state === State.END) {
                                                                                                                                                                const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                                                                const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                                                                onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                                                            }
                                                                                                                                                        }}>
                                                                                                                                                        <Animated.View style={[{
                                                                                                                                                            transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                                                            position: 'absolute',
                                                                                                                                                        }]}>
                                                                                                                                                            <View style={[{ width: 130, height: 80 }]}>
                                                                                                                                                                <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                                                    <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                                                    <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                                                                </View>
                                                                                                                                                                {floorPlanningImages['CircleTableO3']}
                                                                                                                                                            </View>
                                                                                                                                                        </Animated.View>
                                                                                                                                                    </PanGestureHandler>
                                                                                                                                                </GestureHandlerRootView>

                                                                                                                                                :
                                                                                                                                                item.tableDesign === "Circle" && item.tableStatus === "Occupied" && item.capacity === 4 ?
                                                                                                                                                    <GestureHandlerRootView>
                                                                                                                                                        <PanGestureHandler enabled={dragTable}
                                                                                                                                                            onGestureEvent={onGestureEvent}
                                                                                                                                                            onHandlerStateChange={event => {
                                                                                                                                                                if (event.nativeEvent.state === State.END) {
                                                                                                                                                                    const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                                                                    const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                                                                    onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                                                                }
                                                                                                                                                            }}>
                                                                                                                                                            <Animated.View style={[{
                                                                                                                                                                transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                                                                position: 'absolute',
                                                                                                                                                            }]}>
                                                                                                                                                                <View style={[{ width: 130, height: 80 }]}>
                                                                                                                                                                    <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                                                        <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                                                        <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                                                                    </View>
                                                                                                                                                                    {floorPlanningImages['CircleTableO4']}
                                                                                                                                                                </View>
                                                                                                                                                            </Animated.View>
                                                                                                                                                        </PanGestureHandler>
                                                                                                                                                    </GestureHandlerRootView> :
                                                                                                                                                    item.tableDesign === "Circle" && item.tableStatus === "Occupied" && item.capacity === 5 ?
                                                                                                                                                        <GestureHandlerRootView>
                                                                                                                                                            <PanGestureHandler enabled={dragTable}
                                                                                                                                                                onGestureEvent={onGestureEvent}
                                                                                                                                                                onHandlerStateChange={event => {
                                                                                                                                                                    if (event.nativeEvent.state === State.END) {
                                                                                                                                                                        const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                                                                        const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                                                                        onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                                                                    }
                                                                                                                                                                }}>
                                                                                                                                                                <Animated.View style={[{
                                                                                                                                                                    transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                                                                    position: 'absolute',
                                                                                                                                                                }]}>
                                                                                                                                                                    <View style={[{ width: 130, height: 80 }]}>
                                                                                                                                                                        <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                                                            <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                                                            <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                                                                        </View>
                                                                                                                                                                        {floorPlanningImages['CircleTableO5']}
                                                                                                                                                                    </View>
                                                                                                                                                                </Animated.View>
                                                                                                                                                            </PanGestureHandler>
                                                                                                                                                        </GestureHandlerRootView> :
                                                                                                                                                        item.tableDesign === "Circle" && item.tableStatus === "Occupied" && item.capacity === 6 ?
                                                                                                                                                            <GestureHandlerRootView>
                                                                                                                                                                <PanGestureHandler enabled={dragTable}
                                                                                                                                                                    onGestureEvent={onGestureEvent}
                                                                                                                                                                    onHandlerStateChange={event => {
                                                                                                                                                                        if (event.nativeEvent.state === State.END) {
                                                                                                                                                                            const updatedX = item.x + event.nativeEvent.translationX;
                                                                                                                                                                            const updatedY = item.y + event.nativeEvent.translationY;
                                                                                                                                                                            onMoveTable(updatedX, updatedY, item.tableId);
                                                                                                                                                                        }
                                                                                                                                                                    }}>
                                                                                                                                                                    <Animated.View style={[{
                                                                                                                                                                        transform: [{ translateX: translateX }, { translateY: translateY }],
                                                                                                                                                                        position: 'absolute',
                                                                                                                                                                    }]}>
                                                                                                                                                                        <View style={[{ width: 130, height: 80 }]}>
                                                                                                                                                                            <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80, }]}>

                                                                                                                                                                                <Text style={[styless.font9, styless.textBlack]}>{item.tableNo}</Text>
                                                                                                                                                                                <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>{item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}</Text>
                                                                                                                                                                            </View>
                                                                                                                                                                            {floorPlanningImages['CircleTableO6']}
                                                                                                                                                                        </View>
                                                                                                                                                                    </Animated.View>
                                                                                                                                                                </PanGestureHandler>
                                                                                                                                                            </GestureHandlerRootView> : null

            }
        </View>

    );
}
export default DraggableTable;