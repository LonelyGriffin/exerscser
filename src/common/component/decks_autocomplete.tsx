import React, {useEffect, useState} from 'react';
import {useCallback} from 'react';
import {UIAutocomplete} from '../../ui_kit/ui_autocomplete';
import {View} from 'react-native';
import {UITag} from '../../ui_kit/ui_tag';
import {UISuggestion} from '../../ui_kit/ui_suggestion';
import {UIDeckIcon} from '../../ui_kit/icons/deck';
import {Deck} from '../../entity/deck';
import {useForceUpdate} from '../hook/use_force_update';
import {useDataStorage} from '../../storage/hooks';

type Props = {
  decks: Deck[];
  onChange: (value: Deck[]) => void;
};

export const DecksAutocomplete = (props: Props) => {
  const {decks, onChange} = props;
  const forceUpdate = useForceUpdate();
  const dataStorage = useDataStorage();
  const objects = dataStorage.deck.getAll();
  const [text, setText] = useState('');
  const [renderedSuggestions, setSuggestions] = useState<React.ReactNode>(null);

  const onSuggestionTap = useCallback(
    async (deck: Deck) => {
      if (decks.find(x => x.name === deck.name)) {
        onChange(decks.filter(x => x.name !== deck.name));
        return;
      }

      onChange([...decks, deck]);
      setText('');

      if (objects.find(x => x.name === deck.name)) {
        return;
      }

      await dataStorage.deck.upsert(deck);
      forceUpdate();
    },
    [decks, objects, onChange],
  );

  const onTagTap = useCallback((deck: Deck) => onChange(decks.filter(x => x.name !== deck.name)), [decks, onChange]);

  useEffect(() => {
    if (text.length < 3 || decks.find(deck => deck.name === text)) {
      setSuggestions(null);
      return;
    }

    const excludeShowedTagsQuery = decks.map(deck => ` AND name != "${deck.name}"`).join('');
    const query = `name BEGINSWITH "${text}" ${excludeShowedTagsQuery} LIMIT(5)`;

    const suggestionDecks = dataStorage.deck.getByQuery(query);

    const rendered = (
      <View>
        {!suggestionDecks.find(deck => deck.name === text) && (
          <UISuggestion
            text={`Create deck «${text}»`}
            searchText={text}
            onPress={() => onSuggestionTap({name: text, cards: []})}
          />
        )}
        {suggestionDecks.map(deck => (
          <UISuggestion key={deck.name} text={deck.name} searchText={text} onPress={() => onSuggestionTap(deck)} />
        ))}
      </View>
    );

    setSuggestions(rendered);
  }, [text, objects, decks]);

  return (
    <UIAutocomplete
      placeholder={'Decks'}
      tags={decks}
      text={text}
      onChangeText={setText}
      tagIdExtractor={tag => tag.name}
      suggestions={renderedSuggestions}
      suggestionsOpened={Boolean(renderedSuggestions)}
      renderTag={deck => (
        <UITag key={deck.name} text={deck.name} onPress={() => onTagTap(deck)} left={<UIDeckIcon />} />
      )}
    />
  );
};
