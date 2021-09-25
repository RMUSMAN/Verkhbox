import isEqual from "lodash/isEqual";
import React, { Component } from "react";
import {
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import { Header, Icon } from "../../components";
import { BaseColor, BaseStyle } from "../../config";
import { Image } from "react-native-elements";

export default class PreviewImage extends Component {
  constructor(props) {
    super(props);

    // Temp data images define
    this.state = {
      images: [],
      indexSelected: this.props.indexSelected ? this.props.indexSelected : 0,
    };
    this.flatListRef = null;
    this.swiperRef = null;
  }

  onSelect(indexSelected) {
    this.setState(
      {
        indexSelected: indexSelected,
        images: this.state.images.map((item, index) => {
          if (index == indexSelected) {
            return {
              ...item,
              selected: true,
            };
          } else {
            return {
              ...item,
              selected: false,
            };
          }
        }),
      },
      () => {
        try {
          this.flatListRef.scrollToIndex({
            animated: true,
            index: indexSelected,
          });
        } catch (error) {
          
        }
      }
    );
  }

  componentDidMount() {
    if (this.props.photos?.length > 0) {
      

      this.setState({ images: this.getPhotoList(this.props.photos) }, () => {
        if (this.props.indexSelected >= 0) {
      
          this.swiperRef.scrollTo(this.props.indexSelected, true);
        }
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.photos, this.props.photos)) {
      this.setState({ images: this.getPhotoList(this.props.photos) });
    }
  }

  getPhotoList(imagesList) {
    let newImages = imagesList.map((elem, index) => ({
      id: index + 1,
      image: elem,
    }));
    

    if (this.props.indexSelected >= 0) {
      newImages[this.props.indexSelected]["selected"] = true;
    } else {
      newImages[0]["selected"] = true;
    }
    newImages[0]["selected"] = true;
    return newImages;
  }

  /**
   * @description Called when image item is selected or activated
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {*} touched
   * @returns
   */
  onTouchImage(touched) {
    if (touched == this.state.indexSelected) return;
    this.swiperRef.scrollBy(touched - this.state.indexSelected, false);
  }

  render() {
    const { images, indexSelected } = this.state;
    
    const { imagesModal, closeModal } = this.props;
    return (
      <Modal isVisible={imagesModal} style={{ flex: 1, margin: 0 }}>
        <SafeAreaView
          style={[BaseStyle.safeAreaView, { backgroundColor: "black" }]}
          forceInset={{ top: "always" }}
        >
          <Header
            style={{ backgroundColor: "black" }}
            title=""
            renderRight={() => {
              return (
                <Icon
                  iconFamily="FontAwesome5"
                  name="times"
                  size={20}
                  color={BaseColor.whiteColor}
                />
              );
            }}
            onPressRight={() => {
              closeModal();
            }}
            barStyle="light-content"
          />
          {this.state?.images?.length > 0 && (
            <Swiper
              ref={(ref) => {
                this.swiperRef = ref;
              }}
              dotStyle={{
                backgroundColor: BaseColor.textSecondaryColor,
              }}
              paginationStyle={{ bottom: 0 }}
              loop={false}
              activeDotColor={BaseColor.primaryColor}
              removeClippedSubviews={false}
              onIndexChanged={(index) => this.onSelect(index)}
            >
              {images.map((item, key) => {
                return (
                  <Image
                    key={key}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    resizeMode="contain"
                    source={{ uri: item.image }}
                    PlaceholderContent={<ActivityIndicator  />}
                  />
                );
              })}
            </Swiper>
          )}

          <View
            style={{
              paddingVertical: 10,
            }}
          >
            <FlatList
              ref={(ref) => {
                this.flatListRef = ref;
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={images}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.onTouchImage(index);
                  }}
                  activeOpacity={0.9}
                >
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      marginLeft: 20,
                      borderRadius: 8,
                      borderColor:
                        index == indexSelected
                          ? BaseColor.lightPrimaryColor
                          : BaseColor.grayColor,
                      borderWidth: 1,
                    }}
                    source={{ uri: item.image }}
                    PlaceholderContent={<ActivityIndicator color="white" />}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}
