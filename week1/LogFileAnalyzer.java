import java.io.*;
import java.util.*;

class LogFileAnalyzer {
    private static final List<String> keywords = Arrays.asList("ERROR", "WARNING");
    
    public static void analyzeLogFile(String inputFile, String outputFile) {
        Map<String, Integer> keywordCounts = new HashMap<>();
        
        try (BufferedReader reader = new BufferedReader(new FileReader(inputFile));
             BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile))) {
            
            String line;
            while ((line = reader.readLine()) != null) {
                for (String keyword : keywords) {
                    if (line.contains(keyword)) {
                        keywordCounts.put(keyword, keywordCounts.getOrDefault(keyword, 0) + 1);
                        writer.write(line);
                        writer.newLine();
                    }
                }
            }
            
            writer.write("\nSummary:\n");
            for (Map.Entry<String, Integer> entry : keywordCounts.entrySet()) {
                writer.write(entry.getKey() + ": " + entry.getValue());
                writer.newLine();
            }
            
        } catch (IOException e) {
            System.err.println("Error reading/writing file: " + e.getMessage());
        }
    }
    
    public static void main(String[] args) {
        String inputFile = "logs.txt";
        String outputFile = "analysis.txt";
        analyzeLogFile(inputFile, outputFile);
        System.out.println("Log analysis complete. Check " + outputFile);
    }
}
