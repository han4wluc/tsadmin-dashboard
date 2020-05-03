import mobxReactBind from 'mobx-react-bind';
import SortEditorView from './SortEditor.view';
import SortEditorStore from './SortEditor.state';

export default mobxReactBind<any>({
  Store: SortEditorStore,
})(SortEditorView);
