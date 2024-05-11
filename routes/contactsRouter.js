import express from 'express';
import contactsControllers from '../controllers/contactsControllers.js';
import validateBody from '../helpers/middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from '../schemas/contactsSchemas.js';
import isValidMongoId from '../helpers/middlewares/isValidObjectId.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsControllers.getAllContacts);

contactsRouter.get('/:id', isValidMongoId, contactsControllers.getOneContact);

contactsRouter.delete(
  '/:id',
  isValidMongoId,
  contactsControllers.deleteContact
);

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  '/:id',
  isValidMongoId,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  isValidMongoId,
  validateBody(updateFavoriteSchema),
  contactsControllers.updateStatusContact
);

export default contactsRouter;
