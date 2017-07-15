//@flow

import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { append } from 'ramda'

import { type MessageHistory } from '../index.h'
import { MAIN, NET } from '../action'
import { type NetIncomingData } from '../action'

import networker from './networker-state'
import request from './request'

const active = createReducer({
  //$FlowIssue
  [MAIN.ACTIVATED]: () => true,
}, false)

const uid = createReducer({
  //$FlowIssue
  [MAIN.SWITCH_ON]: (state, payload: string) => payload,
}, ' ')

const messageHistory = createReducer({
  //$FlowIssue
  [NET.INCOMING_DATA]: (state: MessageHistory[], { result }: NetIncomingData) =>
    append({
      id       : result.messageID,
      seqNo    : result.seqNo,
      data     : result.response,
      direction: 'in' }, state),
  //$FlowIssue
  [NET.SEND]: (state: MessageHistory[], payload) =>
    append({
      id       : payload.message.msg_id,
      seqNo    : payload.message.seq_no,
      direction: 'out' }, state),
}, [])

const homeDc = createReducer({

}, 2)

const mainReducer = combineReducers({
  _: () => true,
  active,
  homeDc,
  uid,
  messageHistory,
  networker,
  request,
})

export default mainReducer