import ForeignKeyHelper from './ForeignKeyHelper';

describe('ForeignKeyHelper', () => {
  let mockModel: { findOne: any };
  const mockWhere = { id: 1 };

  beforeEach(() => {
    mockModel = {
      findOne: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should resolve with true if model.findOne returns a result', async () => {
    mockModel.findOne.mockImplementationOnce(
      (_where: any, callback: (arg0: null, arg1: { id: number }) => void) => {
        callback(null, { id: 1 });
      }
    );

    const result = await ForeignKeyHelper(mockModel, mockWhere);

    expect(result).toBe(true);
    expect(mockModel.findOne).toHaveBeenCalledWith(
      mockWhere,
      expect.any(Function)
    );
  });

  test('should reject with an error if model.findOne does not return a result', async () => {
    mockModel.findOne.mockImplementationOnce(
      (_where: any, callback: (arg0: null, arg1: null) => void) => {
        callback(null, null);
      }
    );

    await expect(ForeignKeyHelper(mockModel, mockWhere)).rejects.toThrow(
      'ForeignKey Constraint failed'
    );
    expect(mockModel.findOne).toHaveBeenCalledWith(
      mockWhere,
      expect.any(Function)
    );
  });
});
