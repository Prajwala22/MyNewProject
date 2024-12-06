import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { floorPlanningImages } from '../common/FloorPlanningConstants';
import { default as styles, default as styless } from '../../assets/css/style';

const DraggableTable = ({ item, onMoveTable }) => {

    // Initialize shared values for position with initial item.x and item.y
    const offsetX = useSharedValue(item?.x || 0);
    const offsetY = useSharedValue(item?.y || 0);

    // Log shared values for debugging

    // Set the initial position when the item changes (e.g., from props or updates)
    useEffect(() => {
        offsetX.value = item?.x || 0;
        offsetY.value = item?.y || 0;
    }, [item.x, item.y]); // Only trigger when item.x or item.y changes

    // Gesture handler for dragging
    const gesture = Gesture.Pan()
        .onUpdate((event) => {

            // Update the offset values with the translation during dragging
            offsetX.value = item?.x + event.translationX; // Maintain the initial offset value from item.x
            offsetY.value = item?.y + event.translationY; // Maintain the initial offset value from item.y
        })
        .onEnd(() => {
            // After drag ends, pass updated position back to the parent
            runOnJS(onMoveTable)(offsetX.value, offsetY.value, item.tableId);
        });

    // Animated style to apply the translation and handle the movement
    const animatedStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute', // Ensure the table's position is absolute relative to the container
            left: offsetX.value,  // Use offsetX for horizontal positioning
            top: offsetY.value,   // Use offsetY for vertical positioning
            transform: [
                { translateX: withSpring(offsetX.value) }, // Smooth transition
                { translateY: withSpring(offsetY.value) }, // Smooth transition
            ],
        };
    });

    const getTableImage = () => {
        let tableImage = null;

        if (item.tableDesign === "Square") {
            tableImage = floorPlanningImages[`SquareTableE${item.capacity}`];
        } else if (item.tableDesign === "Triangle") {
            tableImage = floorPlanningImages[`TriangleTableE${item.capacity}`];
        } else if (item.tableDesign === "Circle") {
            tableImage = floorPlanningImages[`CircleTableE${item.capacity}`];
        }

        if (tableImage) {
            return <>{tableImage}</>;
        } else {
            console.warn('Image for table not found: ', item.tableDesign, item.capacity);
            return null;
        }
    };

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.draggableTable, animatedStyle]}>
                <View style={{ width: 130, height: 80 }}>
                    <View style={[styless.flexColumn, styless.alignCenter, styless.justifyCenter, { zIndex: 2, height: 80 }]}>
                        <Text style={[styless.font9, styless.textBlack]}>
                            {item.tableNo}
                        </Text>
                        <Text style={[styless.font9, styless.textBlack, styless.fontBold]}>
                            {item.tableStatus === 'Empty' ? 'Available' : 'Occupied'}
                        </Text>
                    </View>
                    {getTableImage()}
                </View>
            </Animated.View>
        </GestureDetector>
    );
};

export default DraggableTable;
