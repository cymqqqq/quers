  /* tslint:disable */
// @ts-ignore 
export const idlFactory = ({ IDL }) => {
  const Args = IDL.Record({
    'answer_content' : IDL.Text,
    'question_id' : IDL.Text,
    'answer_pid' : IDL.Principal,
  });
  const Response = IDL.Variant({
    'Success' : IDL.Null,
    'AnswerInvalid' : IDL.Null,
  });
  const Args_1 = IDL.Record({
    'comment_content' : IDL.Text,
    'question_id' : IDL.Text,
    'answer_pid' : IDL.Principal,
    'comment_pid' : IDL.Principal,
  });
  const Args_2 = IDL.Record({
    'question_title' : IDL.Text,
    'question_asker' : IDL.Principal,
    'question_logo' : IDL.Opt(IDL.Text),
    'question_description' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'question_image' : IDL.Opt(IDL.Text),
  });
  const Response_1 = IDL.Variant({
    'QuestionInvalid' : IDL.Null,
    'Success' : IDL.Null,
  });
  const Args_3 = IDL.Record({ 'question_id' : IDL.Text });
  const Comment = IDL.Record({
    'comment_content' : IDL.Text,
    'down_comment' : IDL.Nat32,
    'comment_date' : IDL.Text,
    'comment_pid' : IDL.Text,
    'up_comment' : IDL.Nat32,
    'comment_id' : IDL.Text,
  });
  const Answer = IDL.Record({
    'down_thumb' : IDL.Nat32,
    'answer_id' : IDL.Text,
    'answer_content' : IDL.Text,
    'up_thumb' : IDL.Nat32,
    'answer_date' : IDL.Text,
    'comments' : IDL.Vec(IDL.Tuple(IDL.Text, Comment)),
    'answer_pid' : IDL.Text,
  });
  const SuccessResult = IDL.Record({ 'answer_list' : IDL.Vec(Answer) });
  const Response_2 = IDL.Variant({ 'Success' : SuccessResult });
  const Args_4 = IDL.Record({ 'answer_pid' : IDL.Principal });
  const SuccessResult_1 = IDL.Record({ 'comment_list' : IDL.Vec(Comment) });
  const Response_3 = IDL.Variant({ 'Success' : SuccessResult_1 });
  const Question = IDL.Record({
    'question_title' : IDL.Text,
    'question_date' : IDL.Text,
    'down_thumb' : IDL.Nat32,
    'question_asker' : IDL.Text,
    'question_logo' : IDL.Opt(IDL.Text),
    'question_description' : IDL.Text,
    'answers' : IDL.Vec(IDL.Tuple(IDL.Text, Answer)),
    'tags' : IDL.Vec(IDL.Text),
    'up_thumb' : IDL.Nat32,
    'question_image' : IDL.Opt(IDL.Text),
    'question_id' : IDL.Text,
  });
  const SuccessResult_2 = IDL.Record({ 'question_list' : IDL.Vec(Question) });
  const Response_4 = IDL.Variant({ 'Success' : SuccessResult_2 });
  const Args_5 = IDL.Record({ 'question_id' : IDL.Text });
  const SuccessResult_3 = IDL.Record({ 'question' : Question });
  const Response_5 = IDL.Variant({ 'Success' : SuccessResult_3 });
  const Args_6 = IDL.Record({ 'owner' : IDL.Principal });
  const QuesAns = IDL.Record({
    'answers' : IDL.Vec(IDL.Text),
    'questions' : IDL.Vec(IDL.Text),
  });
  const Profile = IDL.Record({
    'tvl' : IDL.Nat32,
    'owner' : IDL.Text,
    'qa_mod' : QuesAns,
    'description' : IDL.Text,
    'acount_id' : IDL.Text,
    'holders' : IDL.Nat32,
    'holding' : IDL.Nat32,
    'followers' : IDL.Nat32,
  });
  const SuccessResult_4 = IDL.Record({ 'profile' : Profile });
  const Response_6 = IDL.Variant({ 'Success' : SuccessResult_4 });
  const Args_7 = IDL.Record({ 'owner' : IDL.Principal });
  const SuccessResult_5 = IDL.Record({ 'principal' : IDL.Principal });
  const Response_7 = IDL.Variant({ 'Success' : SuccessResult_5 });
  const Response_8 = IDL.Variant({
    'Success' : IDL.Null,
    'PrincipalInvalid' : IDL.Null,
  });
  const Args_8 = IDL.Record({
    'owner' : IDL.Principal,
    'description' : IDL.Text,
  });
  const Response_9 = IDL.Variant({
    'DescriptionInvalid' : IDL.Null,
    'Success' : IDL.Null,
  });
  const Args_9 = IDL.Record({
    'owner' : IDL.Principal,
    'followers' : IDL.Nat32,
  });
  const Response_10 = IDL.Variant({
    'Success' : IDL.Null,
    'HoldersInvalid' : IDL.Null,
  });
  const Args_10 = IDL.Record({
    'owner' : IDL.Principal,
    'holders' : IDL.Nat32,
  });
  const Response_11 = IDL.Variant({
    'Success' : IDL.Null,
    'HoldersInvalid' : IDL.Null,
  });
  const Args_11 = IDL.Record({
    'owner' : IDL.Principal,
    'holding' : IDL.Nat32,
  });
  const Response_12 = IDL.Variant({
    'TvlInvalid' : IDL.Null,
    'Success' : IDL.Null,
  });
  const Args_12 = IDL.Record({ 'tvl' : IDL.Nat32, 'owner' : IDL.Principal });
  const Response_13 = IDL.Variant({
    'TvlInvalid' : IDL.Null,
    'Success' : IDL.Null,
  });
  return IDL.Service({
    'add_new_answer' : IDL.Func([Args], [Response], []),
    'add_new_comment' : IDL.Func([Args_1], [Response], []),
    'add_new_question' : IDL.Func([Args_2], [Response_1], []),
    'get_all_answers_list_by_question_id' : IDL.Func(
        [Args_3],
        [Response_2],
        ['query'],
      ),
    'get_all_comment_list' : IDL.Func([Args_4], [Response_3], ['query']),
    'get_all_question_list' : IDL.Func(
        [IDL.Record({})],
        [Response_4],
        ['query'],
      ),
    'get_question_by_id' : IDL.Func([Args_5], [Response_5], ['query']),
    'get_user_profile' : IDL.Func([Args_6], [Response_6], ['query']),
    'init_state' : IDL.Func([Args_7], [Response_7], ['query']),
    'set_user_principal' : IDL.Func([Args_7], [Response_8], []),
    'update_profile_description' : IDL.Func([Args_8], [Response_9], []),
    'update_user_followers' : IDL.Func([Args_9], [Response_10], []),
    'update_user_holders' : IDL.Func([Args_10], [Response_11], []),
    'update_user_holding' : IDL.Func([Args_11], [Response_12], []),
    'update_user_tvl' : IDL.Func([Args_12], [Response_13], []),
  });
};
  // @ts-ignore

  export const init = ({ IDL }) => { return []; };
