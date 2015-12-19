namespace TicTacToe.GameLogic
{
    public class GameResultValidator : IGameResultValidator
    {
        // O-X
        // O-X
        // --X
        public GameResult GetResult(string board)
        {
            for (int i = 0; i < 3; i++)
            {
                if (this.CheckRow(board, i))
                {
                    return this.GetWinner(board[i * 3]);
                }

                if (this.CheckCol(board, i))
                {
                    return this.GetWinner(board[i]);
                }

                if (this.CheckDiagonalA(board))
                {
                    return this.GetWinner(board[0]);
                }

                if (this.CheckDiagonalB(board))
                {
                    return this.GetWinner(board[2]);
                }
            }

            if (this.IsFull(board))
            {
                return GameResult.Draw;
            }

            return GameResult.NotFinished;
        }

        private bool IsFull(string board)
        {
            foreach (var mark in board)
            {
                if (mark == '-')
                {
                    return false;
                }
            }

            return true;
        }

        private bool CheckRow(string board, int row)
        {
            var currentChar = board[row * 3];
            if (currentChar == '-')
            {
                return false;
            }
            for (int col = 1; col < 3; col++)
            {
                if (board[row * 3 + col] != currentChar)
                {
                    return false;
                }
            }

            return true;
        }

        private bool CheckCol(string board, int col)
        {
            var currentChar = board[col];
            if (currentChar == '-')
            {
                return false;
            }
            for (int row = 1; row < 3; row++)
            {
                if (board[row * 3 + col] != currentChar)
                {
                    return false;
                }
            }

            return true;
        }

        private bool CheckDiagonalA(string board)
        {
            if (board[0] != '-' && board[0] == board[4] && board[0] == board[8])
            {
                return true;
            }

            return false;
        }

        private bool CheckDiagonalB(string board)
        {
            if (board[2] != '-' && board[2] == board[4] && board[2] == board[6])
            {
                return true;
            }

            return false;
        }

        private GameResult GetWinner(char mark)
        {
            if (mark == 'X')
            {
                return GameResult.WonByX;
            }
            else
            {
                return GameResult.WonByO;
            }
        }
    }
}
