import React, {useState, useCallback, ComponentProps} from 'react';
import {Text} from 'react-native';
import {ContextButtonOnScreen} from '../../common/component/context_button';
import {UIDeleteIcon} from '../../ui_kit/icons/delete';
import {usePortals} from '../../common/component/portals/hook';
import {NewDeckModal} from '../../modal/new_deck_modal';
import {UIPage} from '../../ui_kit/ui_page';
import {UIList} from '../../ui_kit/ui_list';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {SCREEN_NAME} from '../screen_name';
import {useDataStorage} from '../../storage/hooks';
import {Deck} from '../../entity/deck';
import {useForceUpdate} from '../../common/hook/use_force_update';

export const DeckScreen = (props: DrawerScreenProps<{}>) => {
  const forceUpdate = useForceUpdate();
  const navigation: any = props.navigation;
  const dataStorage = useDataStorage();
  const decks = dataStorage.deck.getAll();
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedDecks, setSelectedDecks] = useState<Deck[]>([]);
  const {openPortal} = usePortals();

  const onTapListItem = useCallback(
    (card: Deck) => {
      if (isSelectionMode) {
        if (!selectedDecks.find(x => x.name === card.name)) {
          setSelectedDecks([...selectedDecks, card]);
        } else {
          setSelectedDecks(selectedDecks.filter(x => x.name !== card.name));
        }
      }
    },
    [isSelectionMode, selectedDecks],
  );

  const onPressListItem = useCallback(
    (card: Deck) => {
      if (!isSelectionMode) {
        setSelectedDecks([card]);
        setIsSelectionMode(true);
      }
    },
    [isSelectionMode],
  );

  const onMainContextButtonClick = useCallback(async () => {
    if (isSelectionMode) {
      setIsSelectionMode(false);
      setSelectedDecks([]);
    } else {
      const deck = await openPortal<Deck | undefined, ComponentProps<typeof NewDeckModal>>(NewDeckModal, {}).result;

      if (!deck) {
        return;
      }

      await dataStorage.deck.upsert(deck);
      forceUpdate();
    }
  }, [isSelectionMode]);

  const onRemoveDeck = useCallback(async () => {
    await Promise.all(selectedDecks.map(deck => dataStorage.deck.remove(deck)));
    setIsSelectionMode(false);
    setSelectedDecks([]);
  }, [selectedDecks]);

  const onOpenDeckToLearn = useCallback(() => {
    const deck = selectedDecks[0];
    if (!deck) {
      return;
    }

    navigation.navigate(
      SCREEN_NAME.Learning,
      deck.cards.map(x => x.id),
    );
  }, [navigation, selectedDecks]);

  const expandedButtons = [
    {
      icon: <UIDeleteIcon />,
      text: 'Delete',
      onClick: () => {
        void onRemoveDeck();
      },
    },
  ];

  if (selectedDecks.length === 1 && selectedDecks[0].cards.length > 0) {
    expandedButtons.push({
      icon: <UIDeleteIcon />,
      text: 'Open to learn',
      onClick: onOpenDeckToLearn,
    });
  }

  return (
    <UIPage>
      <UIList
        items={decks}
        idExtractor={(item: Deck) => item.name}
        renderItem={({item}) => <Text>{item.name}</Text>}
        isSelectionMode={isSelectionMode}
        selectedItems={selectedDecks}
        onLongPressItem={onPressListItem}
        onTapItem={onTapListItem}
      />
      <ContextButtonOnScreen
        isExpanded={isSelectionMode}
        expandable={isSelectionMode}
        expandedButtons={expandedButtons}
        onClick={onMainContextButtonClick}
      />
    </UIPage>
  );
};
