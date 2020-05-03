import mobxReactBind from 'mobx-react-bind';
import FilterEditorView from './FilterEditor.view';
import { FilterEditorStore } from './FilterEditor.state';

export default mobxReactBind<any>({
  Store: FilterEditorStore,
})(FilterEditorView);
