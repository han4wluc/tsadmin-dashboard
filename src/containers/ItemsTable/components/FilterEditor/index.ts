import { connect } from '../../../../utils/mobxConnect';
import FilterEditorView from './FilterEditor.view';
import { FilterEditorStore } from './FilterEditor.state';

export default connect<any>({
  Store: FilterEditorStore,
})(FilterEditorView);
