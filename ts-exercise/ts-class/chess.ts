type Color = "Black" | "White";
type Column = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

class Game {
  private pieces = Game.makePieces();

  private static makePieces() {
    return [
      new King("White", 'E', 1),
      new King("Black", 'E', 8),
      new Queen("White", 'D', 1),
      new Queen("Black", 'D', 8),

      new Bishop("White", 'C', 1),
      new Bishop("White", 'F', 1),
      new Bishop("Black", 'C', 8),
      new Bishop("Black", 'F', 8),
      //...
    ]
  }
}

abstract class Piece {
  protected position: Position;
  constructor(
    private readonly color: Color,
    file: Column,
    rank: Row
  ) {
    this.position = new Position(file, rank);
  }
  moveTo(position: Position) {
    this.position = position;
  }
  abstract canMoveTo(position: Position): boolean;
}
class King extends Piece {
  canMoveTo(position: Position): boolean {
    let distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2;
  }
}
class Knight extends Piece {}
class Queen extends Piece {}
class Bishop extends Piece {}
class Rock extends Piece {}
class Pawn extends Piece {}

class Position {
  constructor(
    private file: Column,
    private rank: Row
  ) {}
  distanceFrom(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
    }
  }
}

