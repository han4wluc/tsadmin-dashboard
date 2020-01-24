import { connect } from '../../../../utils/mobxConnect';
import SortEditorView from './SortEditor.view';
import SortEditorStore from './SortEditor.state';

export default connect<any>({
  Store: SortEditorStore,
})(SortEditorView);
