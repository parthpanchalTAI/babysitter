import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { screenWidth, vs } from "../../../utils/styleUtils";
import { getStatusBarHeight } from "../../../utils/globals";
import { colors } from "../../../assets/Colors/colors";
import { Arrays } from "../../../../Arrays";
import ActiveHistoryLists from "../../../components/ListsViews/ActiveHistoryLists/ActiveHistoryLists";
import CompleteHistoryLists from "../../../components/ListsViews/CompleteHistoryLists/CompleteHistoryLists";
import { useDispatch, useSelector } from "react-redux";
import { activeListApi } from "../../../features/historySlice";
import Toast from 'react-native-simple-toast';
import MainContainer from "../../../components/MainContainer";

const History = ({
    route
}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const statusBarHeight = getStatusBarHeight();

    const [isFinished, setIsFinished] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { loading: activeListsLoading, data: activeHistoryLists } = useSelector((state) => state.history.active_lists);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container containerStyle={{ backgroundColor: 'white', paddingTop: statusBarHeight }} mpContainer={{ ph: 15 }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Label mpLabel={{ mt: 5 }} labelSize={30} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>History</Label>
                    <Container onPress={() => navigation.navigate('Search')} containerStyle={{ borderWidth: 1, backgroundColor: '#f2f2f2', borderColor: '#f2f2f2', borderRadius: 40, justifyContent: 'center' }} width={screenWidth * 0.28} height={35}>
                        <Container containerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }} mpContainer={{ mh: 10 }}>
                            <Label labelSize={14} style={{ fontFamily: fonts.regular }}>Search</Label>
                            <Img
                                imgSrc={images.search_img}
                                imgStyle={{
                                    width: 15,
                                    height: 15,
                                    resizeMode: 'contain'
                                }}
                            />
                        </Container>
                    </Container>
                </Container>
            </Container>
        )
    }

    const _renderActiveBookingsLists = ({ item }) => {
        return <ActiveHistoryLists {...item} />
    }

    const _renderCompleteBookingsLists = ({ item }) => {
        return <CompleteHistoryLists {...item} />
    }

    const handleActiveListsRefresh = () => {
        setIsRefreshing(true);
        actionHistoryListsHandler();
    }

    useEffect(() => {
        if (route?.params?.fromAcceptReq) {
            actionHistoryListsHandler();
        }
    }, [route?.params?.fromAcceptReq]);

    const actionHistoryListsHandler = async () => {
        const response = await dispatch(activeListApi({})).unwrap();

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            setIsRefreshing(false);
        } else {
            Toast.show(response?.message, Toast.SHORT);
            setIsRefreshing(false);
        }
    }

    return (
        <MainContainer loading={activeListsLoading}>
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <Container containerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
                    mpContainer={{ mh: 0, mt: 15 }}
                >
                    <Container onPress={() => setIsFinished(true)} containerStyle={{ borderBottomWidth: 1, width: '50%', alignItems: 'center', paddingBottom: vs(5), borderColor: isFinished == true ? colors.light_pink : 'white' }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.regular, color: isFinished == true ? 'black' : 'grey' }}>Active</Label>
                    </Container>

                    <Container onPress={() => setIsFinished(false)} containerStyle={{ borderBottomWidth: 1, width: '50%', alignItems: 'center', paddingBottom: vs(5), borderColor: isFinished == false ? colors.light_pink : 'white' }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.regular, color: isFinished == false ? 'black' : 'grey' }}>Completed</Label>
                    </Container>
                </Container>
                {
                    isFinished == true ?
                        <FlatList
                            data={activeHistoryLists}
                            renderItem={_renderActiveBookingsLists}
                            keyExtractor={(_, index) => index.toString()}
                            contentContainerStyle={{ paddingBottom: vs(20) }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={handleActiveListsRefresh}
                                    colors={['#F27289']}
                                />
                            }
                        />
                        :
                        <FlatList
                            data={Arrays.completeHistoryLists}
                            renderItem={_renderCompleteBookingsLists}
                            keyExtractor={(_, index) => index.toString()}
                            contentContainerStyle={{ paddingBottom: vs(20) }}
                        />
                }
            </Container>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default History;