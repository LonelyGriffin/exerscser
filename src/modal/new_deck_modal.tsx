import React, {ComponentProps} from 'react';
import {UIModal, UIModalChildrenProps} from '../common/component/ui_modal';
import {usePortals} from '../common/component/portals/hook';
import {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useCallback} from 'react';
import {CardList} from '../common/component/card_list';
import {ContextButtonOnModal} from '../common/component/context_button';
import {UIDeleteIcon} from '../ui_kit/icons/delete';
import {NewCardModal} from './new_card_modal';
import {ChooseCardsModal} from './choose_cards_modal';
import {FULL_MODAL_MIN_TOP_OFFSET} from './constants';
import {UiModalHeader} from '../ui_kit/ui_modal_header';
import {UITextInput} from '../ui_kit/ui_text_input';
import {Deck} from '../entity/deck';
import {Card} from '../entity/card';
import {useDataStorage} from '../storage/hooks';
import {UITransparentButton} from '../ui_kit/ui_transparent_button';
import {Title} from '../screen/learning/title';
import {UITitle} from '../ui_kit/ui_title';
import {UIEmptyCardListIcon} from '../ui_kit/icons/empty_card_list';

type OuterProps = {
  topOffset?: number;
};

const TOP_OFFSET_INCREASE = 40;

const NewDeckModalBody = (props: UIModalChildrenProps<Deck> & OuterProps) => {
  const dataStorage = useDataStorage();
  const {close, topOffset} = props;
  const [name, setName] = useState('');
  const [isCardSelectionMode, setIsCardSelectionMode] = useState(false);
  const [isContextMenuOpened, setIsContextMenuOpened] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedItems, setSelectedItems] = useState<Card[]>([]);
  const {openPortal} = usePortals();
  const nestedModalTopOffset = topOffset === undefined ? undefined : topOffset + TOP_OFFSET_INCREASE;

  const saveButtonDisabled = name === '';

  const onSave = useCallback(() => {
    const newDeck: Deck = {
      name,
      cards,
    };

    close(newDeck);
  }, [name, cards, close]);

  const onTapListItem = useCallback(
    (card: Card) => {
      if (isCardSelectionMode) {
        if (!selectedItems.find(x => x.id === card.id)) {
          setSelectedItems([...selectedItems, card]);
        } else {
          setSelectedItems(selectedItems.filter(x => x.id !== card.id));
        }
      }
    },
    [isCardSelectionMode, selectedItems],
  );

  const onPressListItem = useCallback(
    (card: Card) => {
      if (!isCardSelectionMode) {
        setSelectedItems([card]);
        setIsCardSelectionMode(true);
        setIsContextMenuOpened(true);
      }
    },
    [isCardSelectionMode],
  );

  const onMainContextButtonClick = useCallback(() => {
    if (isCardSelectionMode) {
      setIsContextMenuOpened(false);
      setIsCardSelectionMode(false);
      setSelectedItems([]);
    } else {
      setIsContextMenuOpened(!isContextMenuOpened);
    }
  }, [isCardSelectionMode, isContextMenuOpened]);

  const onRemoveCard = useCallback(async () => {
    await dataStorage.card.remove(selectedItems);
    setIsCardSelectionMode(false);
    setSelectedItems([]);
  }, [selectedItems]);

  const onAddExistsCard = useCallback(async () => {
    const newCards = await openPortal<Card[] | undefined, ComponentProps<typeof ChooseCardsModal>>(ChooseCardsModal, {
      topOffset: nestedModalTopOffset,
    }).result;
    if (newCards) {
      setCards([...cards, ...newCards]);
    }
  }, [cards, openPortal, nestedModalTopOffset]);

  const onAddNewCard = useCallback(async () => {
    const newCard = await openPortal<Card | undefined, ComponentProps<typeof NewCardModal>>(NewCardModal, {
      topOffset: nestedModalTopOffset,
    }).result;

    if (newCard) {
      setCards([...cards, newCard]);
    }
  }, [cards, openPortal, nestedModalTopOffset]);

  const expandedButtons = !isCardSelectionMode
    ? [
        {
          icon: <UIDeleteIcon />,
          text: 'Add exists',
          onClick: onAddExistsCard,
        },
        {
          icon: <UIDeleteIcon />,
          text: 'Add new',
          onClick: onAddNewCard,
        },
      ]
    : [
        {
          icon: <UIDeleteIcon />,
          text: 'Delete',
          onClick: onRemoveCard,
        },
      ];

  return (
    <>
      <UiModalHeader
        title={'New Deck'}
        right={<UITransparentButton text="Save" onPress={onSave} disabled={saveButtonDisabled} />}
      />
      <UITextInput placeholder={'Enter a name'} value={name} onChangeText={setName} />
      <UITitle text={'Cards'} style={s.title} />
      {cards.length > 0 ? (
        <CardList
          items={cards}
          viewState={'all'}
          onTapItem={onTapListItem}
          onLongPressItem={onPressListItem}
          isSelectionMode={isCardSelectionMode}
          selectedItems={selectedItems}
        />
      ) : (
        <View style={s.noteBody}>
          <View style={s.note}>
            <Text style={s.noteText}>This deck has no cards. Press the plus button to add one.</Text>
          </View>
          <View style={s.noteIcon}>
            <UIEmptyCardListIcon />
          </View>
        </View>
      )}

      <ContextButtonOnModal
        isExpanded={isContextMenuOpened}
        expandable={isContextMenuOpened}
        expandedButtons={expandedButtons}
        onClick={onMainContextButtonClick}
      />
    </>
  );
};

export const NewDeckModal = (props: OuterProps) => {
  const topOffset = props.topOffset === undefined ? FULL_MODAL_MIN_TOP_OFFSET : props.topOffset;
  return <UIModal topOffset={100}>{modalProps => <NewDeckModalBody {...modalProps} topOffset={topOffset} />}</UIModal>;
};

const s = StyleSheet.create({
  note: {
    flex: 1,
    flexWrap: 'wrap',
  },
  noteText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#8092AD',
    flexWrap: 'wrap',
    flex: 0,
    width: '100%',
  },
  noteBody: {
    marginTop: 8,
    padding: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F4F6F8',
    borderRadius: 8,
    height: 80,
  },
  noteIcon: {
    opacity: 0.5,
  },
  title: {
    marginTop: 16,
  },
});
