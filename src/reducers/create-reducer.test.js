import createReducer from './create-reducer';

describe('create-reducer', () => {
  it('throws when given a non-object', () => {
    expect(() => createReducer('cat')).toThrow()
  })

  it('throws an error when config.initial is not defined', () => {
    expect(() => createReducer({})).toThrow()
  })

  describe('reducer', () => {
    let reducer;
    let mockDogActionHandler;

    beforeEach(() => {
      mockDogActionHandler = jest.fn().mockReturnValue('dog')
      reducer = createReducer({
        initial: 'initial',
        'CAT_ACTION': 'cat',
        'DOG_ACTION': mockDogActionHandler
      })
    })

    it('is a function', () => {
      expect(typeof reducer).toEqual('function')
    })

    it('returns config.initial as initial state', () => {
      expect(reducer(undefined, { type: 'doesn\'t matter' })).toEqual('initial')
    })

    describe('when action handler is defined', () => {
      describe('when action handler is a function', () => {
        const initialState = 'initial';
        const action = { type: 'DOG_ACTION' };
        let result

        beforeEach(() => {
          result = reducer(initialState, action)
        })

        it('returns the result of the action handler function', () => {
          expect(result).toEqual('dog')
        })

        it('calls the action handler function with the state and action', () => {
          expect(mockDogActionHandler).toHaveBeenCalledWith(initialState, action)
        })
      })

      describe('when action handler is not a function', () => {
        let result

        beforeEach(() => {
          result = reducer(undefined, { type: 'CAT_ACTION' })
        })

        it('returns the action handler', () => {
          expect(result).toEqual('cat')
        })
      })
    })

    describe('when action handler is not defined', () => {
      const initialState = { initial: 'state' }
      let result

      beforeEach(() => {
        result = reducer(initialState, { type: 'NOT_MATCHING' })
      })

      it('returns the previous state', () => {
        expect(result).toEqual(initialState)
      })
    })
  })
})