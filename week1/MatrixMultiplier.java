import java.io.*;
import java.util.*;

class MatrixMultiplier {
    private static class Worker implements Runnable {
        private final int row;
        private final int[][] matrixA;
        private final int[][] matrixB;
        private final int[][] result;
        
        public Worker(int row, int[][] matrixA, int[][] matrixB, int[][] result) {
            this.row = row;
            this.matrixA = matrixA;
            this.matrixB = matrixB;
            this.result = result;
        }
        
        @Override
        public void run() {
            int colsB = matrixB[0].length;
            for (int j = 0; j < colsB; j++) {
                for (int k = 0; k < matrixB.length; k++) {
                    result[row][j] += matrixA[row][k] * matrixB[k][j];
                }
            }
        }
    }
    
    public static int[][] multiplyMatrices(int[][] matrixA, int[][] matrixB) {
        int rowsA = matrixA.length;
        int colsA = matrixA[0].length;
        int colsB = matrixB[0].length;
        
        int[][] result = new int[rowsA][colsB];
        Thread[] threads = new Thread[rowsA];
        
        for (int i = 0; i < rowsA; i++) {
            threads[i] = new Thread(new Worker(i, matrixA, matrixB, result));
            threads[i].start();
        }
        
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        
        return result;
    }
    
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }
    }
    
    public static void main(String[] args) {
        int[][] matrixA = {{1, 2}, {3, 4}};
        int[][] matrixB = {{2, 0}, {1, 2}};
        
        int[][] result = multiplyMatrices(matrixA, matrixB);
        System.out.println("Result of the multiplication:");
        printMatrix(result);
    }
}
