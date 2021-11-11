import React from 'react';
import {UIModal, UIModalChildrenProps} from '../common/component/ui_modal';
import {useState} from 'react';
import {Button} from 'react-native';
import {useCallback} from 'react';
import {CardList} from '../common/component/card_list';
import {FULL_MODAL_MIN_TOP_OFFSET} from './constants';
import {UiModalHeader} from '../ui_kit/ui_modal_header';
import {Card} from '../entity/card';
import {useDataStorage} from '../storage/hooks';

type OuterProps = {
  topOffset?: number;
};

const ChooseCardsModalBody = (props: UIModalChildrenProps<Card[]>) => {
  const {close} = props;
  const dataStorage = useDataStorage();
  const cards = dataStorage.card.getAll();
  const [selectedItems, setSelectedItems] = useState<Card[]>([]);

  const saveButtonDisabled = selectedItems.length === 0;

  const onSave = useCallback(() => {
    close(selectedItems);
  }, [selectedItems, close]);

  const onTapListItem = useCallback(
    (card: Card) => {
      if (!selectedItems.find(x => x.id === card.id)) {
        setSelectedItems([...selectedItems, card]);
      } else {
        setSelectedItems(selectedItems.filter(x => x.id !== card.id));
      }
    },
    [selectedItems],
  );
  return (
    <>
      <UiModalHeader
        title={'Choose card'}
        right={<Button title="ok" onPress={onSave} disabled={saveButtonDisabled} />}
      />
      <CardList
        items={cards}
        viewState={'all'}
        onTapItem={onTapListItem}
        isSelectionMode={true}
        selectedItems={selectedItems}
      />
    </>
  );
};

export const ChooseCardsModal = (props: OuterProps) => {
  const topOffset = props.topOffset === undefined ? FULL_MODAL_MIN_TOP_OFFSET : props.topOffset;
  return <UIModal topOffset={topOffset}>{modalProps => <ChooseCardsModalBody {...modalProps} />}</UIModal>;
};
