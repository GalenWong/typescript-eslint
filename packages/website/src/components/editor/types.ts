import type Monaco from 'monaco-editor';
import type { ConfigModel, SelectedRange } from '../types';
import type { TSESTree } from '@typescript-eslint/website-eslint';

export interface CommonEditorProps extends ConfigModel {
  readonly darkTheme: boolean;
  readonly decoration: SelectedRange | null;
  readonly onChange: (value: string) => void;
  readonly onASTChange: (value: string | TSESTree.Program) => void;
  readonly onSelect: (position: Monaco.Position | null) => void;
}