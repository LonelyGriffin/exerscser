import React from 'react';

export type Measurement = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Props<Tag> = {
  tags: Tag[];
  text: string;
  onChangeText: (text: string) => void;
  suggestionsOpened: boolean;
  suggestions: React.ReactNode;
  renderTag: (tag: Tag) => React.ReactNode;
  tagIdExtractor: (tag: Tag) => string;
  placeholder?: string;
};
