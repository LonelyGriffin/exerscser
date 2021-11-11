import React, {ComponentProps} from 'react';
import {useCallback} from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {CardList, CardListViewState} from '../../common/component/card_list';
import {ContextButtonOnScreen} from '../../common/component/context_button';
import {UIDeleteIcon} from '../../ui_kit/icons/delete';
import {usePortals} from '../../common/component/portals/hook';
import {NewCardModal} from '../../modal/new_card_modal';
import {subscribeToRealm} from '../../realm';
import {Card} from '../../realm/schema';
import {UIPage} from '../../ui_kit/ui_page';
import {UIMultiSwitcher} from '../../ui_kit/ui_multi_switcher';
import {ViewCardModal} from '../../modal/view_card_modal';
import {CardDraft} from '../../common/drafts/card_draft';

export const CardsScreen = () => {
  const {objects: cards, realm} = subscribeToRealm<Card>('Card');
  const [cardListViewState, setCardListViewState] =
    useState<CardListViewState>('all');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Card[]>([]);
  const {openPortal} = usePortals();

  const onTapListItem = useCallback(
    (card: Card) => {
      if (isSelectionMode) {
        if (!selectedItems.find(x => x.id === card.id)) {
          setSelectedItems([...selectedItems, card]);
        } else {
          setSelectedItems(selectedItems.filter(x => x.id !== card.id));
        }
      } else {
        openPortal<undefined, ComponentProps<typeof ViewCardModal>>(
          ViewCardModal,
          {
            cardId: card.id,
          },
        );
      }
    },
    [isSelectionMode, selectedItems],
  );

  const onPressListItem = useCallback(
    (card: Card) => {
      if (!isSelectionMode) {
        setSelectedItems([card]);
        setIsSelectionMode(true);
      }
    },
    [isSelectionMode],
  );

  const onMainContextButtonClick = useCallback(async () => {
    if (isSelectionMode) {
      setIsSelectionMode(false);
      setSelectedItems([]);
    } else {
      const draft = await openPortal<
        CardDraft | undefined,
        ComponentProps<typeof NewCardModal>
      >(NewCardModal, {}).result;

      if (draft) {
        await draft.saveToRealm(realm);
      }
    }
  }, [isSelectionMode, openPortal, realm]);

  const onRemoveCard = useCallback(() => {
    setIsSelectionMode(false);
    setSelectedItems([]);
    const cardsToDelete = selectedItems.map(card =>
      realm!.objectForPrimaryKey<Card>('Card', card.id),
    );
    realm!.write(() => {
      realm!.delete(cardsToDelete);
    });
  }, [selectedItems, realm]);

  return (
    <UIPage>
      <UIMultiSwitcher
        style={s.cardListViewSwitcher}
        value={cardListViewState}
        onChange={setCardListViewState}
        options={[
          {value: 'question', label: 'Question'},
          {value: 'all', label: 'All'},
          {value: 'answer', label: 'Answer'},
        ]}
      />
      <CardList
        viewState={cardListViewState}
        items={cards}
        onTapItem={onTapListItem}
        onLongPressItem={onPressListItem}
        isSelectionMode={isSelectionMode}
        selectedItems={selectedItems}
      />
      <ContextButtonOnScreen
        isExpanded={isSelectionMode}
        expandable={isSelectionMode}
        expandedButtons={[
          {
            icon: <UIDeleteIcon />,
            text: 'Delete',
            onClick: onRemoveCard,
          },
        ]}
        onClick={onMainContextButtonClick}
      />
    </UIPage>
  );
};

const s = StyleSheet.create({
  cardListViewSwitcher: {
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 4,
  },
});
