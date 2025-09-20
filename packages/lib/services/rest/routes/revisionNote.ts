import { ModelType } from '../../../BaseModel';
import { Request } from '../Api';
import BaseItem from '../../../models/BaseItem';
import { ErrorNotFound } from '../utils/errors';
import RevisionService from '../../RevisionService';

export default async function(request: Request, id: string = null /* , link: string = null*/) {
	const ModelClass = BaseItem.getClassByItemType(ModelType.Revision);

	const revision = await ModelClass.load(id, { fields: ['id', 'item_id'] });
	if (!revision) throw new ErrorNotFound();

	const noteId = revision['item_id'];

	const revisionNote = await RevisionService.instance().restoreNoteByRevisionId(noteId, id);

	return revisionNote;
}
