﻿namespace TicTacToe.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Game
    {
        public Game()
        {
            this.Id = Guid.NewGuid();
            this.Board = "---------";
            this.State = GameState.WaitingForSecondPlayer;
        }

        public Guid Id { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(15)]
        public string Name { get; set; }

        [StringLength(9)]
        [Column(TypeName = "char")]
        public string Board { get; set; }

        public GameState State { get; set; }

        [Required]
        public string FirstPlayerId { get; set; }

        public virtual User FirstPlayer { get; set; }

        public string SecondPlayerId { get; set; }

        public virtual User SecondPlayer { get; set; }

        public int FirstPlayerPoints { get; set; }

        public int SecondPlayerPoints { get; set; }

        public int LastPlayerStart { get; set; }
    }
}
