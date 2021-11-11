
import {UIModal, UIModalChildrenProps} from "../../common/component/ui_modal";
import React, {useEffect, useState} from "react";
import {FULL_MODAL_MIN_TOP_OFFSET} from "../constants";
import {UiModalHeader} from "../../ui_kit/ui_modal_header";
import {UITransparentButton} from "../../ui_kit/ui_transparent_button";
import {UITextInput} from "../../ui_kit/ui_text_input";
import {usePexelImageSource} from "./use_pexel_image_source";
import {FlatList, Image as ImageComponent, TouchableWithoutFeedback, View, VirtualizedList} from "react-native";
import {usePortal} from "../../common/component/portals/hook";
import {ImageFile} from "../../common/files/image_file";
import {ImagePointer} from "./types";
import {TemporaryDirectoryPath} from "react-native-fs";
import shortid from "shortid";

type Props = {
  initialQuery: string
}


const ChooseImageModalBody = (props: UIModalChildrenProps<ImageFile> & Props) => {
  const {close} = usePortal<ImageFile>()
  const [selected, setSelected] = useState<ImagePointer | undefined>()
  const [isLoadingSelected, setIsLoadingSelected] = useState(false)
  const [query, setQuery] = useState(props.initialQuery)
  const [debQuery, setDevQuery] = useState(query)
  const {loaded, isLoading, pageNumber, nextPage, pageSize, total} = usePexelImageSource(debQuery)
  useEffect(() => {
    const id = setTimeout(() => {
      setDevQuery(query)
    }, 500)

    return () => {
      clearTimeout(id)
    }
  }, [query])

  return (
    <View style={{flex: 1}}>
      <UiModalHeader
        title={'Choose image'}
        right={
          <UITransparentButton
            text={"Ok"}
            onPress={async () => {
              setIsLoadingSelected(true)
              const path = `file://${TemporaryDirectoryPath}/${shortid()}.${selected!.getExt()}`;
              await selected!.loadTo(path)
              close(new ImageFile(
                selected!.width,
                selected!.height,
                path,
              ))
            }}
            disabled={!selected || isLoadingSelected}
          />
        }
      />
      <UITextInput value={query} placeholder={'Search phrase'} onChangeText={setQuery}  />
      <View onTouchEnd={() => {}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => String(index)}
          data={loaded}
          onEndReached={() => nextPage()}
          renderItem={({item}) => {
            return (
              <TouchableWithoutFeedback onPress={() => {setSelected(item)}}>
                <View style={{width: '100%', borderWidth: 1, borderColor: item === selected ? 'red' : 'blue'}}>
                  <ImageComponent style = {{width: 300, height: 500, resizeMode : 'center', margin: 5 }}  source={{uri: item.getUri()}} />
                </View>
              </TouchableWithoutFeedback>
            )
          }}
        />
      </View>
    </View>
  )
}

export const ChooseImageModal = (props: Props & {topOffset?: number}) => {
  return (
    <UIModal topOffset={props.topOffset || FULL_MODAL_MIN_TOP_OFFSET}>
      {modalProps => <ChooseImageModalBody {...modalProps} {...props} />}
    </UIModal>
  )
}


