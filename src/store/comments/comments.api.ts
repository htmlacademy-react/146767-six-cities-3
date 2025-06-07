import {createAppAsyncThunk} from '@/hooks';
import {Comment} from '@/types/offers';
import {APIRoute, RequestMessageError} from '@/constants.js';
import {toast} from 'react-toastify';
import axios from 'axios';

export const fetchCommentsAction = createAppAsyncThunk<
  Comment[],
  string
  >(
    'comments/fetchCommentsList',
    async (id, {extra: {api}}) => {
      try {
        const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);

        return data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.warn(`${RequestMessageError.CommentsLoadingFailed} ${err.message}`);
        }

        throw err;
      }
    }
  );
