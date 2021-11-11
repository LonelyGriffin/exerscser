import React, {useEffect, useState} from 'react';
import {useCallback} from 'react';
import {UIAutocomplete} from '../../ui_kit/ui_autocomplete';
import {View} from 'react-native';
import {UITag} from '../../ui_kit/ui_tag';
import {UITagIcon} from '../../ui_kit/icons/tag';
import {UISuggestion} from '../../ui_kit/ui_suggestion';
import {Tag} from '../../entity/tag';
import {useDataStorage} from '../../storage/hooks';
import {useForceUpdate} from '../hook/use_force_update';

type Props = {
  tags: Tag[];
  onChange: (value: Tag[]) => void;
};

export const TagsAutocomplete = (props: Props) => {
  const {tags, onChange} = props;
  const forceUpdate = useForceUpdate();
  const dataStorage = useDataStorage();
  const objects = dataStorage.tag.getAll();
  const [text, setText] = useState('');
  const [renderedSuggestions, setSuggestions] = useState<React.ReactNode>(null);

  const onSuggestionTap = useCallback(
    async (tag: Tag) => {
      if (tags.find(x => x.name === tag.name)) {
        onChange(tags.filter(x => x.name !== tag.name));
        return;
      }

      onChange([...tags, tag]);
      setText('');

      if (objects.find(x => x.name === tag.name)) {
        return;
      }

      await dataStorage.tag.upsert(tag);
      forceUpdate();
    },
    [tags, objects, onChange],
  );

  const onTagTap = useCallback((tag: Tag) => onChange(tags.filter(x => x.name !== tag.name)), [tags, onChange]);

  useEffect(() => {
    if (text.length < 3 || tags.find(tag => tag.name === text)) {
      setSuggestions(null);
      return;
    }

    const excludeShowedTagsQuery = tags.map(tag => ` AND name != "${tag.name}"`).join('');
    const query = `name BEGINSWITH "${text}" ${excludeShowedTagsQuery} LIMIT(5)`;

    const suggestionTags = dataStorage.tag.getByQuery(query);

    const rendered = (
      <View>
        {!suggestionTags.find(tag => tag.name === text) && (
          <UISuggestion
            text={`Create tag «${text}»`}
            searchText={text}
            onPress={() => onSuggestionTap({name: text, cards: []})}
          />
        )}
        {suggestionTags.map(tag => (
          <UISuggestion key={tag.name} text={tag.name} searchText={text} onPress={() => onSuggestionTap(tag)} />
        ))}
      </View>
    );

    setSuggestions(rendered);
  }, [text, objects, tags]);

  return (
    <UIAutocomplete
      placeholder={'Tags'}
      tags={tags}
      text={text}
      onChangeText={setText}
      tagIdExtractor={tag => tag.name}
      suggestions={renderedSuggestions}
      suggestionsOpened={Boolean(renderedSuggestions)}
      renderTag={tag => <UITag key={tag.name} text={tag.name} onPress={() => onTagTap(tag)} left={<UITagIcon />} />}
    />
  );
};
